import { revalidatePath } from "next/cache";
import { DbConnection } from "../database/db";
import { ProjectScanRepository } from "../repositories/project-scan-repository";
import { BaseService } from "./base-service";
import { SQSClient, SendMessageCommand, SendMessageRequest } from "@aws-sdk/client-sqs";
import { SoftwareProjectService } from "./software-project-service";
import { ISoftwareProjectRecord } from "@/types/software-project";
import { IProjectScanRecord } from "@/types/project-scan";

const sqsConfig = {
    region: process.env.AWS_SQS_REGION ?? '',
    credentials: {
        accessKeyId: process.env.AWS_SQS_USER_ACCESS_KEY ?? '',
        secretAccessKey: process.env.AWS_SQS_USER_SECRET_KEY ?? ''
    }
}

export class ProjectScanService extends BaseService {
    projectScanRepository: ProjectScanRepository;

    constructor(connection: DbConnection) {
        super(connection);

        this.projectScanRepository = new ProjectScanRepository(connection);
    }


    async scanProjectById(projectId: number) {
        const softwareProjectService = new SoftwareProjectService(this.connection);

        // Step 1. Check if the project exists before scanning
        const softwareProjectRecord = await softwareProjectService.getProjectRecordById(projectId);

        if (!softwareProjectRecord) {
            throw new Error(`Failed to find project with ID: ${projectId}`)
        }

        // Step 2. Dispatch the scan
        return await this.disaptchProjectScan(softwareProjectRecord);
    }

    async disaptchProjectScan(projectRecord: ISoftwareProjectRecord): Promise<IProjectScanRecord>{
        // Step 1. Persist the scan in the database
        const scanRecord = await this.projectScanRepository.createProjectScanRecord(projectRecord.software_project_id)

        // Step 2. Record the current language statistics for the repo
        const githubResponse = await fetch(`https://api.github.com/repos/${projectRecord.full_name}/languages`);
        const gitHubJson = await githubResponse.json() as Record<string, number>;
        await this.projectScanRepository.addLanguagesToProjectScan(scanRecord.software_project_scan_id, gitHubJson);


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
        await this.projectScanRepository.addTagsToProjectScan(softwareProjectScanId, tags);

        // Step 2. End-date the current scan
        await this.projectScanRepository.updateProjectScanRecordEndDate(softwareProjectScanId)
    }

    async deleteProjectScansByProjectId(softwareProjectId: number): Promise<void> {
        await this.projectScanRepository.deleteProjectLanguagesByProjectId(softwareProjectId);
        await this.projectScanRepository.deleteProjectTagsByProjectId(softwareProjectId);
        await this.projectScanRepository.deleteProjectScansByProjectId(softwareProjectId);
    }
}
