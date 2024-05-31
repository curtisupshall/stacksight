import { DbConnection } from "../database/db";
import { BaseRepository } from "./base-repository";
import { ISoftwareProject } from "@/types/software-project";
import { SoftwareProjectRepository } from "./software-project-repository";
import { IProjectScanContributor } from "@/types/contributor";

export class ContributorRepository extends BaseRepository {
    
    constructor(connection: DbConnection) {
        super(connection);
    }

    async addContributorsToProjectScan(projectScanId: number, contributors: IProjectScanContributor[]) {
        // Prepare SQL statement for inserting multiple contributors
        const sql = `
            INSERT INTO software_project_scan_contributor (
                software_project_scan_id,
                login,
                html_url,
                contributions,
                avatar_url,
            ) VALUES 
            ${contributors.map((_, index) => `($1, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`).join(", ")}
        `;
        
        // Flatten contributor details into a single array for parameterized query
        const params = contributors.reduce((acc: string[], contributor) => ([
            ...acc,
            contributor.login,
            contributor.html_url,
            contributor.avatar_url,
            String(contributor.contributions)
        ]), [String(projectScanId)]);
    
        // Perform the database query
        await this.connection.query(sql, params);
    }

    async getContributorsByProjectScanId(projectScanId: number): Promise<IProjectScanContributor[]> {
        const response = await this.connection.query(
            `
                SELECT *
                FROM software_project_scan_contributor
                WHERE software_project_scan_id = $1
            `,
            [projectScanId]
        );

        return response.rows;
    }
    
    async deleteContributorsByProjectId(projectId: number): Promise<void> {
        await this.connection.query(
            `
                DELETE FROM software_project_scan_contributor
                WHERE software_project_scan_id IN (
                    SELECT software_project_scan_id
                    FROM software_project_scan
                    WHERE software_project_id = $1
                )
            `,
            [projectId]
        );
    }
    
}
