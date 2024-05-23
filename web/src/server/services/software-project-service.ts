import { SQSClient, SendMessageCommand, SendMessageCommandOutput, SendMessageRequest } from "@aws-sdk/client-sqs";
import type { DbConnection } from "../database/db";
import type { ISoftwareProject, ISoftwareProjectRecord } from "../../types/software-project";
import { BaseService } from "./base-service";
import { revalidatePath } from "next/cache";
import { SoftwareProjectRepository } from "../repositories/software-project-repository";
import { IProjectScanRecord } from "../../types/project-scan";
import { ProjectScanRepository } from "../repositories/project-scan-repository";
import { ProjectScanService } from "./project-scan-service";

export class SoftwareProjectService extends BaseService {
    softwareProjectRepository: SoftwareProjectRepository;

    constructor(connection: DbConnection) {
        super(connection);

        this.softwareProjectRepository = new SoftwareProjectRepository(connection);
    }

    async listProjects() {
        return this.softwareProjectRepository.listProjects();
    }

    async listProjectsByOwnerName(ownerName: string) {
        return this.softwareProjectRepository.listProjectsByOwnerName(ownerName);
    }

    async getProjectById(softwareProjectId: number): Promise<ISoftwareProject | undefined> {
        return this.softwareProjectRepository.getProjectById(softwareProjectId);
    }

    async getProjectByFullName(fullName: string): Promise<ISoftwareProject | undefined> {
        return this.softwareProjectRepository.getProjectByFullName(fullName);
    }

    async getProjectRecordById(softwareProjectId: number): Promise<ISoftwareProjectRecord | undefined> {
        return this.softwareProjectRepository.getProjectRecordById(softwareProjectId);
    }

    async addNewProject(repoFullName: string, branchName: string | ''): Promise<ISoftwareProjectRecord> {
        const projectScanService = new ProjectScanService(this.connection);

        // Step 1. Fetch information about the repo from GitHub
        const githubResponse = await fetch(`https://api.github.com/repos/${repoFullName}`);
        const gitHubJson = await githubResponse.json() as any;
        const branchOrDefaultName = branchName ?? gitHubJson.default_branch
        
        // Step 2. Check if the project is already added. If it has been, throw an error
        const project = await this.softwareProjectRepository.getProjectByFullName(repoFullName);

        if (project) {
            throw new Error('Project has already been added. If you want to scan a different branch, you must delete this project first.')
        }

        // Step 3. Persist the new project in the database
        const projectRecord = await this.softwareProjectRepository.addNewProject({
            full_name: gitHubJson.full_name,
            owner_name: gitHubJson.owner.login,
            branch_name: branchOrDefaultName,
            project_name: gitHubJson.name,
            description: gitHubJson.description,
            html_url: gitHubJson.html_url
        });

        // Step 4. Dispatch a new scan of the repo.
        await projectScanService.disaptchProjectScan(projectRecord);

        return projectRecord;
    }
}
