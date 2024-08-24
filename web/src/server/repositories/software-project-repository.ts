import type { CreateSoftwareProjectRecord, SoftwareProjectWithLatestScan } from "../../types/software-project";
import db from "@/database/client";
import { Project, ProjectScan } from "@/database/schemas";
import { ProjectScanRecordWithRelations } from "@/types/project-scan";
import { asc, desc, eq, like } from "drizzle-orm";

export class SoftwareProjectRepository {
    static async listProjectsWithLatestScan(): Promise<SoftwareProjectWithLatestScan[]> {
        const projects = await db.query.Project.findMany({
            with: {
                scans: {
                    orderBy: [desc(ProjectScan.dispatchedAt)],
                    limit: 1,
                    with: {
                        tags: true,
                        commit: true,
                        contributors: true,
                        languages: true,
                    }
                }
            }
        })

        return projects.map((project) => ({
            ...project,
            scan: project.scans[0] ?? null,
        }));
    }

    static async listProjectsWithLatestScanByOwnerName(ownerName: string): Promise<SoftwareProjectWithLatestScan[]> {
        const projects = await db.query.Project.findMany({
            where: eq(Project.ownerName, ownerName),
            with: {
                scans: {
                    orderBy: [desc(ProjectScan.dispatchedAt)],
                    limit: 1,
                    with: {
                        tags: true,
                        commit: true,
                        contributors: true,
                        languages: true,
                    }
                }
            }
        });

        return projects.map((project) => ({
            ...project,
            scan: project.scans[0] ?? null,
        }));
    }

    // async getProjectById(softwareProjectId: number): Promise<ISoftwareProject | undefined> {
    //     const query = this._getListProjectsQuery()
    //         .where('sp.software_project_id', softwareProjectId);

    //     const response = await this.connection.knex(query);

    //     return response.rows[0];
    // }

    static async getProjectRecordById(softwareProjectId: number) {
        return db.query.Project.findFirst({
            where: eq(Project.softwareProjectId, softwareProjectId)
        });
    }

    static async getProjectByFullName(repoFullName: string) {
        return db.query.Project.findFirst({
            where: eq(Project.fullName, repoFullName),
        });
    }

    static async getProjectWithLatestScanByFullName(repoFullName: string): Promise<SoftwareProjectWithLatestScan | undefined> {
        const response = await db.query.Project.findFirst({
            where: eq(Project.fullName, repoFullName),
            with: {
                scans: {
                    orderBy: [desc(ProjectScan.dispatchedAt)],
                    limit: 1,
                    with: {
                        tags: true,
                        commit: true,
                        contributors: true,
                        languages: true,
                    }
                }
            }
        });

        if (!response) {
            return undefined;
        }

        return {
            ...response,
            scan: response.scans[0] ?? null,
        }
    }

    static async searchProjectsWithLatestScanByFullName(repoFullName: string): Promise<SoftwareProjectWithLatestScan[]> {
        const projects = await db.query.Project.findMany({
            where: like(Project.fullName, `%${repoFullName}%`),
            with: {
                scans: {
                    orderBy: [desc(ProjectScan.dispatchedAt)],
                    limit: 1,
                    with: {
                        tags: true,
                        commit: true,
                        contributors: true,
                        languages: true,
                    }
                }
            }
        })

        return projects.map((project) => ({
            ...project,
            scan: project.scans[0] ?? null,
        }));
    }

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

    /**
     * To be fixed by STAC-39.
     */
    static async listProjectsWithLatestScanByTag(tag: string): Promise<SoftwareProjectWithLatestScan[]> {
        // const query = this._getListProjectsQuery()
        //     .whereExists(function () {
        //         // Nested query to check existence of the tag within the current project's scans
        //         this.select('*')
        //             .from('software_project_scan_tag as spt')
        //             .whereRaw('spt.software_project_scan_id = latest_scan_details.software_project_scan_id')
        //             .andWhere('spt.tag', '=', tag);
        //     });
    
        // const response = await this.connection.knex(query);

        // return response.rows;
        return [];
    }
}
