import { ICreateProjectScanRecord, IProjectScanRecord } from "@/types/project-scan";
import { DbConnection } from "../database/db";
import { BaseRepository } from "./base-repository";

export class ProjectScanRepository extends BaseRepository {
    
    constructor(connection: DbConnection) {
        super(connection);
    }

    async createProjectScanRecord(newScanRecord: ICreateProjectScanRecord): Promise<IProjectScanRecord> {
        const response = await this.connection.query(`
            INSERT INTO software_project_scan (
                software_project_id,
                commit_sha,
                commit_message,
                author_name,
                commit_date,
                commit_html_url
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                newScanRecord.software_project_id,
                newScanRecord.commit_sha,
                newScanRecord.commit_message,
                newScanRecord.author_name,
                newScanRecord.commit_date,
                newScanRecord.commit_html_url
            ]
        );

        return response.rows[0];
    }

    async listScansByProjectId(softwareProjectId: number): Promise<IProjectScanRecord[]> {
        const response = await this.connection.query(
            `
                SELECT * FROM software_project_scan
                WHERE software_project_id = $1;
            `, [softwareProjectId]
        );

        return response.rows;
    }

    async getLatestSuccessfulScanByProjectId(softwareProjectId: number): Promise<IProjectScanRecord | undefined> {
        const response = await this.connection.query(
            `
                SELECT *
                FROM software_project_scan
                WHERE completed_at IS NOT NULL
                AND software_project_id = $1
                ORDER BY dispatched_at DESC
                LIMIT 1;
            `,
            [softwareProjectId]
        );

        return response.rows[0]
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

    async deleteProjectTagsByProjectId(softwareProjectId: number): Promise<void> {
        await this.connection.query(`
            DELETE FROM software_project_tag
            WHERE software_project_scan_id IN (
                SELECT software_project_scan_id
                FROM software_project_scan
                WHERE software_project_id = $1
            )
        `, [softwareProjectId]);
    }

    async deleteProjectLanguagesByProjectId(softwareProjectId: number): Promise<void> {
        await this.connection.query(`
            DELETE FROM software_project_language
            WHERE software_project_scan_id IN (
                SELECT software_project_scan_id
                FROM software_project_scan
                WHERE software_project_id = $1
            )
        `, [softwareProjectId]);
    }

    async deleteProjectScansByProjectId(softwareProjectId: number): Promise<void> {
        await this.connection.query(`
            DELETE FROM software_project_scan WHERE software_project_id = $1;
        `, [softwareProjectId]);
    }
}
