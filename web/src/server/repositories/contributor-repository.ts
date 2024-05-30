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
                contributions
            ) VALUES 
            ${contributors.map((_, index) => `($1, $${index * 3 + 2}, $${index * 3 + 3}, $${index * 3 + 4})`).join(", ")}
        `;
        
        // Flatten contributor details into a single array for parameterized query
        const params = contributors.reduce((acc: string[], contributor) => ([
            ...acc,
            contributor.login,
            contributor.html_url,
            String(contributor.contributions)
        ]), [String(projectScanId)]);
    
        // Perform the database query
        await this.connection.query(sql, params);
    }
    
}
