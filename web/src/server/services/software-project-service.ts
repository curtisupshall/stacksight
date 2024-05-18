import { SQS, SQSClient, SendMessageCommand, SendMessageCommandOutput, SendMessageRequest } from "@aws-sdk/client-sqs";
import type { DbConnection } from "../database/db";
import type { ISoftwareProject, ISoftwareProjectRecord } from "../../types/software-project";
import { BaseService } from "./base-service";
import { revalidatePath } from "next/cache";
import { SoftwareProjectRepository } from "../repositories/software-project-repository";
import { IProjectScanRecord } from "../../types/project-scan";

const sqsConfig = {
    region: process.env.AWS_SQS_REGION ?? '',
    credentials: {
        accessKeyId: process.env.AWS_SQS_USER_ACCESS_KEY ?? '',
        secretAccessKey: process.env.AWS_SQS_USER_SECRET_KEY ?? ''
    }
}

export class SoftwareProjectService extends BaseService {
    softwareProjectRepository: SoftwareProjectRepository;

    constructor(connection: DbConnection) {
        super(connection);

        this.softwareProjectRepository = new SoftwareProjectRepository(connection);
    }

    async listProjects() {
        return this.softwareProjectRepository.listProjects();
    }

    async getProjectById(softwareProjectId: number): Promise<ISoftwareProject | undefined> {
        return this.softwareProjectRepository.getProjectById(softwareProjectId);
    }

    async getProjectRecordById(softwareProjectId: number): Promise<ISoftwareProjectRecord | undefined> {
        return this.softwareProjectRepository.getProjectRecordById(softwareProjectId);
    }

    async addNewProject(repoFullName: string, branchName: string): Promise<ISoftwareProjectRecord> {
        // Step 1. Check if the project is already added. If it has been, throw an error
        const project = await this.softwareProjectRepository.getProjectByFullNameAndBranchName(repoFullName, branchName);

        if (project) {
            throw new Error('Project has already been added.')
        }

        // Step 2. Fetch information about the repo from GitHub
        const githubResponse = await fetch(`https://api.github.com/repos/${repoFullName}`);
        const gitHubJson = await githubResponse.json() as any;

        // Step 3. Persist the new project in the database
        const projectRecord = await this.softwareProjectRepository.addNewProject({
            full_name: gitHubJson.full_name,
            owner_name: gitHubJson.owner.login,
            branch_name: branchName,
            project_name: gitHubJson.name,
            description: gitHubJson.description,
            html_url: gitHubJson.html_url
        });

        // Step 4. Dispatch a new scan of the repo.
        await this.disaptchProjectScan(projectRecord);

        return projectRecord;
    }

    async scanProjectById(projectId: number) {
        // Step 1. Check if the project exists before scanning
        const softwareProjectRecord = await this.getProjectRecordById(projectId);

        if (!softwareProjectRecord) {
            throw new Error(`Failed to find project with ID: ${projectId}`)
        }

        // Step 2. Dispatch the scan
        return await this.disaptchProjectScan(softwareProjectRecord);
    }

    async disaptchProjectScan(projectRecord: ISoftwareProjectRecord): Promise<IProjectScanRecord>{
        // Step 1. Persist the scan in the database
        const scanRecord = await this.softwareProjectRepository.createProjectScanRecord(projectRecord.software_project_id)

        // Step 2. Record the current language statistics for the repo
        const githubResponse = await fetch(`https://api.github.com/repos/${projectRecord.full_name}/languages`);
        const gitHubJson = await githubResponse.json() as Record<string, number>;
        await this.softwareProjectRepository.addLanguagesToProjectScan(scanRecord.software_project_scan_id, gitHubJson);


        // Step 3. Dispatch the scan to the repo scan queue
        const sqsClient = new SQSClient(sqsConfig);
        if (!process.env.AWS_REPO_SCAN_QUEUE_URL) {
            throw new Error('Could not find AWS_REPO_SCAN_QUEUE_URL')
        }

        const messageBody = {
            softwareProjectId: projectRecord.software_project_id,
            softwareProjectScanId: scanRecord.software_project_scan_id,
            repoFullName: `${projectRecord.owner_name}/${projectRecord.project_name}`,
            branchName: projectRecord.branch_name
        }        
        const messageRequest: SendMessageRequest = {
            QueueUrl: process.env.AWS_REPO_SCAN_QUEUE_URL,
            MessageBody: JSON.stringify(messageBody),
        }

        try {
            const sqsResponse = await sqsClient.send(new SendMessageCommand(messageRequest));
            console.log(sqsResponse);
        } catch (error: any) {
            throw new Error('Failed to dispatch message to SQS:', error);
        }

        return scanRecord;
    }

    async recordProjectScanTags(softwareProjectScanId: number, tags: string[]) {
        // Step 1. Persist the software tags in the database
        await this.softwareProjectRepository.addTagsToProjectScan(softwareProjectScanId, tags);

        // Step 2. End-date the current scan
        await this.softwareProjectRepository.updateProjectScanRecordEndDate(softwareProjectScanId)

        revalidatePath('/projects');
    }
}
