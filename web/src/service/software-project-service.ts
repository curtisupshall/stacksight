import { SQS } from "aws-sdk";
import type { DbConnection } from "../database/db";
import type { ISoftwareProject } from "../types/software-project";
import { BaseService } from "./base-service";

const sqsConfig = {
    region: process.env.AWS_SQS_REGION,
    // endpoint: process.env.AWS_SQS_ENDPOINT,
    accessKeyId: process.env.AWS_SQS_USER_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SQS_USER_SECRET_KEY
}

export class SoftwareProjectService extends BaseService {
    constructor(connection: DbConnection) {
        super(connection);
    }

    async listProjects() {
        const sqlQuery = `
            SELECT
                sp.*,
                sps.dispatched_at AS last_scan_dispatched_at,
                sps.completed_at AS last_scan_completed_at
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
            ORDER BY sp.created_at DESC
        `;

        const response = await this.connection.query(sqlQuery);

        return response.rows;
    }

    async addNewProject(repoFullName: string, branchName: string) {
        // Step 1. Check if the project is already added. If it has been, throw an error
        const databaseResponse = await this.connection.query(
            `SELECT COUNT(*) as project_count FROM software_project WHERE full_name ILIKE $1`,
            [repoFullName]
        )

        if (databaseResponse.rows[0].project_count > 0) {
            throw new Error('Project has already been added.')
        }

        // Step 2. Fetch information about the repo from GitHub
        const githubResponse = await fetch(`https://api.github.com/repos/${repoFullName}`);
        const gitHubJson = await githubResponse.json() as any;

        // 2. Persist the new project in the database
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
                gitHubJson.full_name,
                gitHubJson.owner.login,
                branchName,
                gitHubJson.name,
                gitHubJson.description,
                gitHubJson.html_url
            ]
        );

        return response.rows[0];
    }

    async scanProject(softwareProjectId: number) {
        // Step 1. Fetch data about the project
        const response = await this.connection.query(
            `SELECT * FROM software_project WHERE software_project_id = $1`, 
            [softwareProjectId]
        );

        const softwareProject: ISoftwareProject = response.rows[0];
        if (!softwareProject) {
            throw new Error(`Failed to find project with ID: ${softwareProjectId}`)
        }

        // Step 2. Persist the dispatched scan in the database
        await this.connection.query(
            `INSERT INTO software_project_scan (
                software_project_id
            ) VALUES ($1)`,
            [
                softwareProjectId
            ]
        );

        // Step 3. Add the scan to the repo scan queue
        const sqs = new SQS(sqsConfig);
        if (!process.env.AWS_REPO_SCAN_QUEUE_URL) {
            throw new Error('Could not find AWS_REPO_SCAN_QUEUE_URL')
        }

        const messageBody = {
            softwareProjectId,
            repoFullName: `${softwareProject.owner_name}/${softwareProject.project_name}`,
            branchName: softwareProject.branch_name
        }
        
        const messageParams = {
            MessageBody: JSON.stringify(messageBody),
            QueueUrl: process.env.AWS_REPO_SCAN_QUEUE_URL
        }

        sqs.sendMessage(messageParams, (error, data) => {
            if (error) {
                throw error;
            }

            console.log(data);
        })
    }

    async recordProjectTags (softwareProjectId: number, tags: string[]) {
        await this.connection.query(`
            INSERT INTO software_project_tag
                (software_project_id, tag)
            VALUES
                ($1, $2)`,
            [
                softwareProjectId,
                tags[0] // TODO
            ]
        );

        return;
    }
}
