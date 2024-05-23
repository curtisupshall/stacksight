import { IProjectScanRecord } from "@/types/project-scan";
import { DbConnection } from "../database/db";
import { BaseRepository } from "./base-repository";

export class ProjectScanRepository extends BaseRepository {
    
    constructor(connection: DbConnection) {
        super(connection);
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
    }
}
