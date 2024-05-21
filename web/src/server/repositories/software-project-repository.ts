import { getKnex, type DbConnection } from "../database/db";
import type { ICreateSoftwareProjectRecord, ISoftwareProject, ISoftwareProjectRecord } from "../../types/software-project";
import { BaseRepository } from "./base-repository";
import { IProjectScanRecord } from "../../types/project-scan";

export class SoftwareProjectRepository extends BaseRepository {
    
    constructor(connection: DbConnection) {
        super(connection);
    }

    _getListProjectsQuery() {
        const knex = getKnex();

        // Define the CTE for the latest scans of each project
        const latestScans = knex('software_project_scan')
            .select('software_project_id', knex.raw('MAX(dispatched_at) as max_dispatched_at'))
            .groupBy('software_project_id')
            .as('latest_scans');

        // CTE for details of the latest scans
        const latestScanDetails = knex('software_project_scan as sps')
            .select('sps.software_project_id', 'sps.software_project_scan_id', 'sps.dispatched_at', 'sps.completed_at', 'sps.aborted_at')
            .join(latestScans, function() {
                this.on('sps.software_project_id', '=', 'latest_scans.software_project_id')
                    .andOn('sps.dispatched_at', '=', 'latest_scans.max_dispatched_at');
            })
            .as('latest_scan_details');

        // CTE for tags associated with the latest scans
        const tags = knex('software_project_tag as spt')
            .select('spt.software_project_scan_id')
            .select(knex.raw('array_agg(distinct spt.tag) filter (where spt.tag is not null) as tags'))
            .join(latestScanDetails, 'spt.software_project_scan_id', '=', 'latest_scan_details.software_project_scan_id')
            .groupBy('spt.software_project_scan_id')
            .as('tags');

        // CTE for languages associated with the latest scans
        const languages = knex('software_project_language as spl')
            .select('spl.software_project_scan_id')
            .select(knex.raw('json_agg(json_build_object(\'language_name\', spl.language_name, \'num_lines\', spl.num_lines)) as languages'))
            .join(latestScanDetails, 'spl.software_project_scan_id', '=', 'latest_scan_details.software_project_scan_id')
            .groupBy('spl.software_project_scan_id')
            .as('languages');

        // Final query assembling all the pieces
        const projects = knex('software_project as sp')
            .select('sp.*')
            .select('latest_scan_details.dispatched_at as last_scan_dispatched_at')
            .select('latest_scan_details.completed_at as last_scan_completed_at')
            .select('latest_scan_details.aborted_at as last_scan_aborted_at')
            .select('tags.tags')
            .select('languages.languages')
            .leftJoin(latestScanDetails, 'sp.software_project_id', 'latest_scan_details.software_project_id')
            .leftJoin(tags, 'latest_scan_details.software_project_scan_id', 'tags.software_project_scan_id')
            .leftJoin(languages, 'latest_scan_details.software_project_scan_id', 'languages.software_project_scan_id')
            .orderBy('sp.created_at', 'desc');

        return projects;
    }

    async listProjects() {
        const response = await this.connection.knex(this._getListProjectsQuery());

        return response.rows;
    }

    async getProjectById(softwareProjectId: number): Promise<ISoftwareProject | undefined> {
        const query = this._getListProjectsQuery()
            .where('sp.software_project_id', softwareProjectId);

        const response = await this.connection.knex(query);

        return response.rows[0];
    }

    async getProjectRecordById(softwareProjectId: number): Promise<ISoftwareProjectRecord | undefined> {
        const sqlQuery = `SELECT * FROM software_project WHERE software_project_id = $1`;

        const response = await this.connection.query(sqlQuery, [softwareProjectId]);

        return response.rows[0];
    }

    async getProjectByFullNameAndBranchName(repoFullName: string, branchName: string): Promise<ISoftwareProject | undefined> {
        
        const query = this._getListProjectsQuery()
            .whereILike('sp.full_name', repoFullName)
            .andWhereILike('sp.branch_name', branchName);

        const response = await this.connection.knex(query);

        return response.rows[0];
    }

    async addNewProject(project: ICreateSoftwareProjectRecord): Promise<ISoftwareProjectRecord> {
        const response = await this.connection.query(
            `INSERT INTO software_project (
                full_name,
                owner_name,
                branch_name,
                project_name,
                description,
                html_url
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                project.full_name,
                project.owner_name,
                project.branch_name,
                project.project_name,
                project.description,
                project.html_url
            ]
        );

        return response.rows[0];
    }

    async createProjectScanRecord(softwareProjectId: number): Promise<IProjectScanRecord> {
        const response = await this.connection.query(`
            INSERT INTO software_project_scan (
                software_project_id
            )
            VALUES ($1)
            RETURNING *`,
            [
                softwareProjectId
            ]
        );

        return response.rows[0];
    }

    async updateProjectScanRecordEndDate(softwareProjectScanId: number) {
        await this.connection.query(`
            UPDATE software_project_scan
            SET completed_at = NOW()
            WHERE software_project_scan_id = $1
        `, [softwareProjectScanId]);
    }

    async addTagsToProjectScan(softwareProjectScanId: number, tags: string[]) {
        const queryValues = tags.map(tag => [softwareProjectScanId, tag]);
        await this.connection.query(`
            INSERT INTO software_project_tag
                (software_project_scan_id, tag)
            VALUES
                ${queryValues.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(',')}
        `, queryValues.flat());
    }

    async addLanguagesToProjectScan(softwareProjectScanId: number, languages: Record<string, number>) {
        const queryValues = Object.entries(languages).map(([langaugeName, numLines]) => {
            return [softwareProjectScanId, langaugeName, numLines]
        });

        await this.connection.query(`
            INSERT INTO software_project_language
                (software_project_scan_id, language_name, num_lines)
            VALUES
                ${queryValues.map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`).join(',')}
        `, queryValues.flat());
    }}
