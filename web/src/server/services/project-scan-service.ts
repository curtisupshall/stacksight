import { ProjectScanRepository } from "../repositories/project-scan-repository";
import { SQSClient, SendMessageCommand, SendMessageRequest } from "@aws-sdk/client-sqs";
import { SoftwareProjectRecord } from "@/types/software-project";
import { IProjectScanLambdaResponse, IProjectScanSqsMessage } from "@/types/sqs";
import { CreateProjectScanCommitRecord } from "@/types/project-scan";
import { CreateProjectScanContributorRecord } from "@/types/contributor";
import { ContributorService } from "./contributor-service";
import { SoftwareProjectService } from "./software-project-service";

const sqsConfig = {
    region: process.env.AWS_SQS_REGION ?? '',
    credentials: {
        accessKeyId: process.env.AWS_SQS_USER_ACCESS_KEY ?? '',
        secretAccessKey: process.env.AWS_SQS_USER_SECRET_KEY ?? ''
    }
}

export class ProjectScanService {
    static async scanProjectById(softwareProjectId: number) {
        // Step 1. Check if the project exists before scanning
        const softwareProjectRecord = await SoftwareProjectService.getProjectRecordById(softwareProjectId);

        if (!softwareProjectRecord) {
            throw new Error(`Failed to find project with ID: ${softwareProjectId}`)
        }

        // Step 2. Dispatch the scan
        return await this.disaptchProjectScan(softwareProjectRecord);
    }

    static async listScansWithRelationsByProjectId(softwareProjectId: number) {
        return ProjectScanRepository.listScansWithRelationsByProjectId(softwareProjectId);
    }

    static async getLatestSuccessfulScanWithRelationsByProjectId(softwareProjectId: number) {
        return ProjectScanRepository.getLatestSuccessfulScanWithRelationsByProjectId(softwareProjectId);
    }

    static async disaptchProjectScan(projectRecord: SoftwareProjectRecord) {
        const { softwareProjectId } = projectRecord;

        // Step 1. Persist the scan in the database
        const scanRecord = await ProjectScanRepository.createProjectScanRecord({
            softwareProjectId
        });

        try {

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
                    successEndpoint: `${process.env.PROCESSING_UPLOAD_API_HOST}/api/projects/${softwareProjectId}/scans/${softwareProjectScanId}`,
                    errorEndpoint: `${process.env.PROCESSING_UPLOAD_API_HOST}/api/projects/${softwareProjectId}/scans/${softwareProjectScanId}/error'`,
                }
            }

            const messageRequest: SendMessageRequest = {
                QueueUrl: process.env.AWS_REPO_SCAN_QUEUE_URL,
                MessageBody: JSON.stringify(messageBody),
            }

            const sqsResponse = await sqsClient.send(new SendMessageCommand(messageRequest));
            console.log(sqsResponse);
        } catch (error: any) {
            ProjectScanRepository.markProjectScanAsAborted(
                scanRecord.softwareProjectScanId,
                `Failed to dispatch message to SQS: ${error}`
            );
        }

        return scanRecord;
    }

    static async patchProjectScan(softwareProjectScanId: number, body: IProjectScanLambdaResponse) {
        // Step 1. Collect commit details
        const commitRecord: CreateProjectScanCommitRecord = {
            softwareProjectScanId,
            commitSha: body.last_commit.sha,
            commitMessage: body.last_commit.commit.message,
            authorName: body.last_commit.commit.author.name,
            commitDate: new Date(body.last_commit.commit.committer.date),
            commitHtmlUrl: body.last_commit.html_url,
        }

        try {
            await ProjectScanRepository.createProjectScanCommit(commitRecord);

            // Step 2. Persist contributor details in the database
            const contributors: CreateProjectScanContributorRecord[] = body.contributors.map((record: any): CreateProjectScanContributorRecord => ({
                softwareProjectScanId,
                login: record.login,
                htmlUrl: record.html_url,
                contributions: record.contributions,
                avatarUrl: record.avatar_url,
            }));

            await ContributorService.createProjectScanContributors(contributors);

            // Step 3. Record the current language statistics for the repo
            await ProjectScanRepository.addLanguagesToProjectScan(softwareProjectScanId, body.languages);

            // Step 4. Persist the software tags in the database
            await ProjectScanRepository.addTagsToProjectScan(softwareProjectScanId, body.tags);

            // Step 5. End-date the current scan
            await ProjectScanRepository.markProjectScanAsCompleted(softwareProjectScanId)
        } catch (error: any) {
            ProjectScanRepository.markProjectScanAsAborted(
                softwareProjectScanId,
                `Failed to patch project scan record: ${error}`
            );
        }
    }

    // async deleteProjectScansByProjectId(softwareProjectId: number): Promise<void> {
    //     const contributorService = new ContributorService(this.connection);
    //     await contributorService.deleteContributorsByProjectId(softwareProjectId)
    //     await this.projectScanRepository.deleteProjectLanguagesByProjectId(softwareProjectId);
    //     await this.projectScanRepository.deleteProjectTagsByProjectId(softwareProjectId);
    //     await this.projectScanRepository.deleteProjectScansByProjectId(softwareProjectId);
    // }
}
