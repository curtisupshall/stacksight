import { ProjectScanRepository } from "../repositories/project-scan-repository";
import { BaseService } from "./base-service";
import { SQSClient, SendMessageCommand, SendMessageRequest } from "@aws-sdk/client-sqs";
import { SoftwareProjectRecord } from "@/types/software-project";
import { IProjectScanSqsMessage } from "@/types/python";

const sqsConfig = {
    region: process.env.AWS_SQS_REGION ?? '',
    credentials: {
        accessKeyId: process.env.AWS_SQS_USER_ACCESS_KEY ?? '',
        secretAccessKey: process.env.AWS_SQS_USER_SECRET_KEY ?? ''
    }
}

export class ProjectScanService extends BaseService {
    // async scanProjectById(softwareProjectId: number) {
    //     const softwareProjectService = new SoftwareProjectService(this.connection);

    //     // Step 1. Check if the project exists before scanning
    //     const softwareProjectRecord = await softwareProjectService.getProjectRecordById(softwareProjectId);

    //     if (!softwareProjectRecord) {
    //         throw new Error(`Failed to find project with ID: ${softwareProjectId}`)
    //     }

    //     // Step 2. Dispatch the scan
    //     return await this.disaptchProjectScan(softwareProjectRecord);
    // }

    // async listScansByProjectId(softwareProjectId: number) {
    //     return this.projectScanRepository.listScansByProjectId(softwareProjectId);
    // }

    // async getLatestSuccessfulScanByProjectId(softwareProjectId: number): Promise<IProjectScanRecord | undefined> {
    //     return this.projectScanRepository.getLatestSuccessfulScanByProjectId(softwareProjectId);
    // }

    static async disaptchProjectScan(projectRecord: SoftwareProjectRecord) {
        const { softwareProjectId } = projectRecord;

        // Step 1. Persist the scan in the database
        const scanRecord = await ProjectScanRepository.createProjectScanRecord({
            softwareProjectId
        });

        // Step 2. Dispatch the scan to the repo scan queue
        const sqsClient = new SQSClient(sqsConfig);
        if (!process.env.AWS_REPO_SCAN_QUEUE_URL) {
            throw new Error('Could not find AWS_REPO_SCAN_QUEUE_URL')
        }

        const { softwareProjectScanId } = scanRecord;

        const messageBody: IProjectScanSqsMessage = {
            project: {
                repoFullName: `${projectRecord.ownerName}/${projectRecord.projectName}`,
                branchName: projectRecord.branchName
            },
            api: {
                successEndpoint: `${process.env.PYTHON_UPLOAD_API_HOST}/api/projects/${softwareProjectId}/scans/${softwareProjectScanId}`,
                errorEndpoint: `${process.env.PYTHON_UPLOAD_API_HOST}/api/projects/${softwareProjectId}/scans/${softwareProjectScanId}/error'`,
            }
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

    // async patchProjectScan(softwareProjectScanId: number, body: IProjectScanLambdaResponse) {
    //     const contributorService = new ContributorService(this.connection);

    //     // Step 1. Collect commit details
    //     const commitRecord: IProjectCommitRecord = {
    //         'commit_sha': body.last_commit.sha,
    //         'commit_message': body.last_commit.commit.message,
    //         'author_name': body.last_commit.commit.author.name,
    //         'commit_date': body.last_commit.commit.committer.date,
    //         'commit_html_url': body.last_commit.html_url,
    //     }
    //     await this.projectScanRepository.addCommitToProjectScan(softwareProjectScanId, commitRecord);

    //     // Step 2. Persist contributor details in the database
    //     const contributors: IProjectScanContributor[] = body.contributors.map((record) => ({
    //         login: record.login,
    //         html_url: record.html_url,
    //         contributions: record.contributions,
    //         avatar_url: record.avatar_url
    //     }));
    //     await contributorService.addContributorsToProjectScan(softwareProjectScanId, contributors);

    //     // Step 3. Record the current language statistics for the repo
    //     await this.projectScanRepository.addLanguagesToProjectScan(softwareProjectScanId, body.languages);

    //     // Step 4. Persist the software tags in the database
    //     await this.projectScanRepository.addTagsToProjectScan(softwareProjectScanId, body.tags);

    //     // Step 5. End-date the current scan
    //     await this.projectScanRepository.updateProjectScanRecordEndDate(softwareProjectScanId)
    // }

    // async deleteProjectScansByProjectId(softwareProjectId: number): Promise<void> {
    //     const contributorService = new ContributorService(this.connection);
    //     await contributorService.deleteContributorsByProjectId(softwareProjectId)
    //     await this.projectScanRepository.deleteProjectLanguagesByProjectId(softwareProjectId);
    //     await this.projectScanRepository.deleteProjectTagsByProjectId(softwareProjectId);
    //     await this.projectScanRepository.deleteProjectScansByProjectId(softwareProjectId);
    // }
}
