
import { CreateProjectScanContributorRecord } from "@/types/contributor";
import db from "@/database/client";
import { ProjectScanContributor } from "@/database/schemas";

export class ContributorRepository {
    static async createProjectScanContributors(contributors: CreateProjectScanContributorRecord[]) {
        const rows = await db.insert(ProjectScanContributor).values(contributors).returning();
        return rows;
    }

    // async getContributorsByProjectScanId(projectScanId: number): Promise<IProjectScanContributor[]> {
    //     const response = await this.connection.query(
    //         `
    //             SELECT *
    //             FROM software_project_scan_contributor
    //             WHERE software_project_scan_id = $1
    //         `,
    //         [projectScanId]
    //     );

    //     return response.rows;
    // }
    
    // async deleteContributorsByProjectId(projectId: number): Promise<void> {
    //     await this.connection.query(
    //         `
    //             DELETE FROM software_project_scan_contributor
    //             WHERE software_project_scan_id IN (
    //                 SELECT software_project_scan_id
    //                 FROM software_project_scan
    //                 WHERE software_project_id = $1
    //             )
    //         `,
    //         [projectId]
    //     );
    // }
    
}
