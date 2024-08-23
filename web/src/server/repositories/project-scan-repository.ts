import db from "@/database/client";
import { ProjectCommit, ProjectLanguage, ProjectScan, ProjectTag } from "@/database/schemas";
import { CreateProjectScanLanguageRecord } from "@/types/languages";
import { CreateProjectScanCommitRecord, CreateProjectScanRecord, CreateProjectScanTagRecord, ProjectScanRecordWithRelations, } from "@/types/project-scan";
import { and, desc, eq, isNotNull } from "drizzle-orm";


export class ProjectScanRepository {
    static async createProjectScanRecord(scan: CreateProjectScanRecord) {
        const rows = await db.insert(ProjectScan).values(scan).returning();
        return rows[0];
    }

    // async listScansByProjectId(softwareProjectId: number): Promise<IProjectScanRecord[]> {
    //     const response = await this.connection.query(
    //         `
    //             SELECT * FROM software_project_scan
    //             WHERE software_project_id = $1;
    //         `, [softwareProjectId]
    //     );

    //     return response.rows;
    // }

    static async getLatestSuccessfulScanWithRelationsByProjectId(softwareProjectId: number): Promise<ProjectScanRecordWithRelations | undefined> {
        const response = await db.query.ProjectScan.findFirst({
            where: and(
                eq(ProjectScan.softwareProjectId, softwareProjectId),
                isNotNull(ProjectScan.completedAt),
            ),
            orderBy: desc(ProjectScan.completedAt),
            with: {
                tags: true,
                commits: true,
                contributors: true,
                languages: true,
            }
        });

        return response;
    }

    static async markProjectScanAsCompleted(softwareProjectScanId: number) {
        const rows = await db.update(ProjectScan)
            .set({
                completedAt: new Date()
            })
            .where(eq(ProjectScan.softwareProjectScanId, softwareProjectScanId))
            .returning();

        return rows[0];
            
    }

    static async addTagsToProjectScan(softwareProjectScanId: number, tags: string[]) {
        const queryValues = tags.map((tag: string): CreateProjectScanTagRecord => {
            return {
                softwareProjectScanId,
                tag
            }
        });

        const rows = await db.insert(ProjectTag).values(queryValues).returning();
        return rows;
    }

    static async addLanguagesToProjectScan(softwareProjectScanId: number, languages: Record<string, number>) {
        const insertRecords: CreateProjectScanLanguageRecord[]
            = Object.entries(languages).map(([languageName, numLines]): CreateProjectScanLanguageRecord => {
            return {
                softwareProjectScanId,
                languageName,
                numLines
            }
        });

        const rows = await db.insert(ProjectLanguage).values(insertRecords).returning();
        return rows;
    }

    static async createProjectScanCommit(commitRecord: CreateProjectScanCommitRecord) {
        const rows = await db.insert(ProjectCommit).values(commitRecord).returning();
        return rows[0];
    }

    // async deleteProjectTagsByProjectId(softwareProjectId: number): Promise<void> {
    //     await this.connection.query(`
    //         DELETE FROM software_project_scan_tag
    //         WHERE software_project_scan_id IN (
    //             SELECT software_project_scan_id
    //             FROM software_project_scan
    //             WHERE software_project_id = $1
    //         )
    //     `, [softwareProjectId]);
    // }

    // async deleteProjectLanguagesByProjectId(softwareProjectId: number): Promise<void> {
    //     await this.connection.query(`
    //         DELETE FROM software_project_language
    //         WHERE software_project_scan_id IN (
    //             SELECT software_project_scan_id
    //             FROM software_project_scan
    //             WHERE software_project_id = $1
    //         )
    //     `, [softwareProjectId]);
    // }

    // async deleteProjectScansByProjectId(softwareProjectId: number): Promise<void> {
    //     await this.connection.query(`
    //         DELETE FROM software_project_scan WHERE software_project_id = $1;
    //     `, [softwareProjectId]);
    // }
}
