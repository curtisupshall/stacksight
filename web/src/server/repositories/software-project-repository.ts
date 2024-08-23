import type { CreateSoftwareProjectRecord } from "../../types/software-project";
import db from "@/database/client";
import { Project, ProjectScan } from "@/database/schemas";
import { asc, eq } from "drizzle-orm";

export class SoftwareProjectRepository {
    // _getListProjectsQuery(): Knex.QueryBuilder {
        
    
    //     // Define the CTE for the latest scans of each project
    //     const latestScans = knex('software_project_scan')
    //         .select('software_project_id', knex.raw('MAX(dispatched_at) as max_dispatched_at'))
    //         .groupBy('software_project_id')
    //         .as('latest_scans');
    
    //     // CTE for details of the latest scans
    //     const latestScanDetails = knex('software_project_scan as sps')
    //         .select('sps.*')
    //         .join(latestScans, function() {
    //             this.on('sps.software_project_id', '=', 'latest_scans.software_project_id')
    //                 .andOn('sps.dispatched_at', '=', 'latest_scans.max_dispatched_at');
    //         })
    //         .as('latest_scan_details');
    
    //     // CTE for tags associated with the latest scans
    //     const tags = knex('software_project_scan_tag as spt')
    //         .select('spt.software_project_scan_id')
    //         .select(knex.raw('array_agg(distinct spt.tag) filter (where spt.tag is not null) as tags'))
    //         .join(latestScanDetails, 'spt.software_project_scan_id', '=', 'latest_scan_details.software_project_scan_id')
    //         .groupBy('spt.software_project_scan_id')
    //         .as('tags');
    
    //     // CTE for languages associated with the latest scans
    //     const languages = knex('software_project_language as spl')
    //         .select('spl.software_project_scan_id')
    //         .select(knex.raw('json_agg(json_build_object(\'language_name\', spl.language_name, \'num_lines\', spl.num_lines)) as languages'))
    //         .join(latestScanDetails, 'spl.software_project_scan_id', '=', 'latest_scan_details.software_project_scan_id')
    //         .groupBy('spl.software_project_scan_id')
    //         .as('languages');
    
    //     // Final query assembling all the pieces
    //     const projects = knex('software_project as sp')
    //         .select('sp.*')
    //         .select({
    //             last_scan: knex.raw(`
    //                 json_build_object(
    //                     'software_project_scan_id', latest_scan_details.software_project_scan_id,
    //                     'software_project_id', latest_scan_details.software_project_id,
                        
    //                     'dispatched_at', latest_scan_details.dispatched_at,
    //                     'completed_at', latest_scan_details.completed_at,
    //                     'aborted_at', latest_scan_details.aborted_at,
    //                     'tags', tags.tags,
    //                     'languages', languages.languages
    //                 )
    //             `)
    //         })
    //         .leftJoin(latestScanDetails, 'sp.software_project_id', 'latest_scan_details.software_project_id')
    //         .leftJoin(tags, 'latest_scan_details.software_project_scan_id', 'tags.software_project_scan_id')
    //         .leftJoin(languages, 'latest_scan_details.software_project_scan_id', 'languages.software_project_scan_id')
    //         .orderBy('sp.created_at', 'desc');
    
    //     return projects;
    // }


    static async listProjects(): Promise<any> {
        const projects = await db.query.Project.findMany({
            with: {
                scans: {
                    orderBy: [asc(ProjectScan.dispatchedAt)],
                    limit: 1,
                    with: {
                        tags: true,
                        // commits: true,
                        // contributors: true,
                    }
                }
            }
        })

        // return projects.map((project) => ({
        //     ...project,
        //     scan: project.scans[0],
        // }));
        return projects;
    }

    // async listProjectsByOwnerName(ownerName: string): Promise<ISoftwareProject[]> {
    //     const query = this._getListProjectsQuery()
    //         .where('sp.owner_name', ownerName);

    //     const response = await this.connection.knex(query);

    //     return response.rows;
    // }

    // async getProjectById(softwareProjectId: number): Promise<ISoftwareProject | undefined> {
    //     const query = this._getListProjectsQuery()
    //         .where('sp.software_project_id', softwareProjectId);

    //     const response = await this.connection.knex(query);

    //     return response.rows[0];
    // }

    // async getProjectRecordById(softwareProjectId: number): Promise<ISoftwareProjectRecord | undefined> {
    //     const sqlQuery = `SELECT * FROM software_project WHERE software_project_id = $1`;

    //     const response = await this.connection.query(sqlQuery, [softwareProjectId]);

    //     return response.rows[0];
    // }

    static async getProjectByFullName(repoFullName: string) {
        
        return db.query.Project.findFirst({
            where: eq(Project.fullName, repoFullName),
        });
    }

    // async searchProjectsByFullName(repoFullName: string): Promise<ISoftwareProject[]> {
    //     const query = this._getListProjectsQuery()
    //         .where('sp.full_name', 'ilike', `%${repoFullName}%`)

    //     const response = await this.connection.knex(query);

    //     return response.rows
    // }

    static async addNewProject(project: CreateSoftwareProjectRecord) {
        const rows = await db.insert(Project).values(project).returning();
        return rows[0];
    }

    // async deleteProjectRecordByProjectId(softwareProjectId: number): Promise<ISoftwareProjectRecord> {
    //     const response = await this.connection.query(`
    //         DELETE FROM software_project WHERE software_project_id = $1
    //         RETURNING *;
    //     `, [softwareProjectId]);

    //     return response.rows[0]
    // }

    // async listProjectsByTag(tag: string): Promise<ISoftwareProject[]> {
    //     const query = this._getListProjectsQuery()
    //         .whereExists(function () {
    //             // Nested query to check existence of the tag within the current project's scans
    //             this.select('*')
    //                 .from('software_project_scan_tag as spt')
    //                 .whereRaw('spt.software_project_scan_id = latest_scan_details.software_project_scan_id')
    //                 .andWhere('spt.tag', '=', tag);
    //         });
    
    //     const response = await this.connection.knex(query);

    //     return response.rows;
    // }
}
