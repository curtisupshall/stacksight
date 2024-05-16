import { SQS } from "aws-sdk";
import type { DbConnection } from "../database/db";
import type { ICreateSoftwareProjectRecord, ISoftwareProject, ISoftwareProjectRecord } from "../../types/software-project";
import { revalidatePath } from "next/cache";
import { BaseRepository } from "./base-repository";
import { IProjectScanRecord } from "../../types/project-scan";

export class SoftwareProjectRepository extends BaseRepository {
    
    constructor(connection: DbConnection) {
        super(connection);
    }

    async listProjects() {
        const sqlQuery = `
            SELECT
                sp.*,
                sps.dispatched_at AS last_scan_dispatched_at,
                sps.completed_at AS last_scan_completed_at,
                sps.aborted_at AS last_scan_aborted_at,
                array_agg(spt.tag) FILTER (WHERE spt.tag IS NOT NULL) AS tags
            FROM software_project sp
            LEFT JOIN (
                SELECT
                    software_project_id,
                    MAX(dispatched_at) AS max_dispatched_at
                FROM software_project_scan
                GROUP BY software_project_id
            ) latest_sps ON sp.software_project_id = latest_sps.software_project_id
            LEFT JOIN software_project_scan sps ON sp.software_project_id = sps.software_project_id
                AND sps.dispatched_at = latest_sps.max_dispatched_at
            LEFT JOIN software_project_scan sps2 ON sps2.software_project_id = sp.software_project_id
                AND sps2.dispatched_at = latest_sps.max_dispatched_at
            LEFT JOIN software_project_tag spt ON sps2.software_project_scan_id = spt.software_project_scan_id
            GROUP BY sp.software_project_id, sps.dispatched_at, sps.completed_at, sps.aborted_at
            ORDER BY sp.created_at DESC
        `;

        const response = await this.connection.query(sqlQuery);

        return response.rows;
    }

    async getProjectById(softwareProjectId: number): Promise<ISoftwareProject | undefined> {
        const sqlQuery = `
            SELECT
                sp.*,
                sps.dispatched_at AS last_scan_dispatched_at,
                sps.completed_at AS last_scan_completed_at,
                sps.aborted_at AS last_scan_aborted_at,
                array_agg(spt.tag) FILTER (WHERE spt.tag IS NOT NULL) AS tags
            FROM software_project sp
            LEFT JOIN (
                SELECT
                    software_project_id,
                    MAX(dispatched_at) AS max_dispatched_at
                FROM software_project_scan
                GROUP BY software_project_id
            ) latest_sps ON sp.software_project_id = latest_sps.software_project_id
            LEFT JOIN software_project_scan sps ON sp.software_project_id = sps.software_project_id
                AND sps.dispatched_at = latest_sps.max_dispatched_at
            LEFT JOIN software_project_scan sps2 ON sps2.software_project_id = sp.software_project_id
                AND sps2.dispatched_at = latest_sps.max_dispatched_at
            LEFT JOIN software_project_tag spt ON sps2.software_project_scan_id = spt.software_project_scan_id
            WHERE sp.software_project_id = $1
            GROUP BY sp.software_project_id, sps.dispatched_at, sps.completed_at, sps.aborted_at
            ORDER BY sp.created_at DESC
        `;

        const response = await this.connection.query(sqlQuery, [softwareProjectId]);

        return response.rows[0];
    }

    async getProjectRecordById(softwareProjectId: number): Promise<ISoftwareProjectRecord | undefined> {
        const sqlQuery = `SELECT * FROM software_project WHERE software_project_id = $1`;

        const response = await this.connection.query(sqlQuery, [softwareProjectId]);

        return response.rows[0];
    }

    async getProjectByFullNameAndBranchName(repoFullName: string, branchName: string): Promise<ISoftwareProject | undefined> {
        const sqlQuery = `
            SELECT
                sp.*,
                sps.dispatched_at AS last_scan_dispatched_at,
                sps.completed_at AS last_scan_completed_at,
                sps.aborted_at AS last_scan_aborted_at,
                array_agg(spt.tag) FILTER (WHERE spt.tag IS NOT NULL) AS tags
            FROM software_project sp
            LEFT JOIN (
                SELECT
                    software_project_id,
                    MAX(dispatched_at) AS max_dispatched_at
                FROM software_project_scan
                GROUP BY software_project_id
            ) latest_sps ON sp.software_project_id = latest_sps.software_project_id
            LEFT JOIN software_project_scan sps ON sp.software_project_id = sps.software_project_id
                AND sps.dispatched_at = latest_sps.max_dispatched_at
            LEFT JOIN software_project_scan sps2 ON sps2.software_project_id = sp.software_project_id
                AND sps2.dispatched_at = latest_sps.max_dispatched_at
            LEFT JOIN software_project_tag spt ON sps2.software_project_scan_id = spt.software_project_scan_id
            WHERE sp.full_name ILIKE $1
            AND sp.branch_name ILIKE $2
            GROUP BY sp.software_project_id, sps.dispatched_at, sps.completed_at, sps.aborted_at
            ORDER BY sp.created_at DESC
        `;

        const response = await this.connection.query(sqlQuery, [repoFullName, branchName]);

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
            ) VALUES ($1)`,
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
}
