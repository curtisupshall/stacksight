import { ICreateProjectScanRecord, IProjectCommitRecord, IProjectScanRecord } from "@/types/project-scan";
import { DbConnection } from "../database/db";
import { BaseRepository } from "./base-repository";
import { ISoftwareProject } from "@/types/software-project";
import { SoftwareProjectRepository } from "./software-project-repository";

export class ProjectScanRepository extends BaseRepository {
    
    constructor(connection: DbConnection) {
        super(connection);
    }

    async createProjectScanRecord(newScanRecord: ICreateProjectScanRecord): Promise<IProjectScanRecord> {
        const response = await this.connection.query(`
            INSERT INTO software_project_scan (
                software_project_id
            )
            VALUES ($1)
            RETURNING *`,
            [
                newScanRecord.software_project_id,
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
            INSERT INTO software_project_scan_tag
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

    async addCommitToProjectScan(softwareProjectScanId: number, commitRecord: IProjectCommitRecord) {
        await this.connection.query(
            `
                INSERT INTO software_project_scan_commit (
                    software_project_scan_id,
                    author_name,
                    commit_date,
                    commit_html_url,
                    commit_message,
                    commit_sha
                ) VALUES (
                    $1, $2, $3, $4, $5, $6
                )
            `,
            [
                softwareProjectScanId,
                commitRecord.author_name,
                commitRecord.commit_date,
                commitRecord.commit_html_url,
                commitRecord.commit_message,
                commitRecord.commit_sha
            ]
        )
    }

    async deleteProjectTagsByProjectId(softwareProjectId: number): Promise<void> {
        await this.connection.query(`
            DELETE FROM software_project_scan_tag
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
