import { ProjectScanRecordWithRelations } from "@/types/project-scan";
import { SoftwareProjectRepository } from "../repositories/software-project-repository";
import { ProjectScanService } from "./project-scan-service";
import { SoftwareProjectWithLatestScan } from "@/types/software-project";

export class SoftwareProjectService {

    static async listProjectsWithLatestScan() {
        return SoftwareProjectRepository.listProjectsWithLatestScan();
    }

    static async listProjectsWithLatestScanByOwnerName(ownerName: string) {
        return SoftwareProjectRepository.listProjectsWithLatestScanByOwnerName(ownerName);
    }

    // async getProjectById(softwareProjectId: number): Promise<ISoftwareProject | undefined> {
    //     return this.softwareProjectRepository.getProjectById(softwareProjectId);
    // }

    static async getProjectByFullName(fullName: string) {
        return SoftwareProjectRepository.getProjectByFullName(fullName);
    }

    static async getProjectWithLatestScanByFullName(fullName: string) {
        return SoftwareProjectRepository.getProjectWithLatestScanByFullName(fullName);
    }

    static async getProjectRecordById(softwareProjectId: number) {
        return SoftwareProjectRepository.getProjectRecordById(softwareProjectId);
    }

    static async addNewProject(repoFullName: string, branchName: string | '') {

        // Step 1. Fetch information about the repo from GitHub
        const githubResponse = await fetch(`https://api.github.com/repos/${repoFullName}`);
        const gitHubJson = await githubResponse.json() as any;
        const branchOrDefaultName = branchName ?? gitHubJson.default_branch
        
        // Step 2. Check if the project is already added. If it has been, throw an error
        const project = await SoftwareProjectRepository.getProjectByFullName(repoFullName);

        if (project) {
            throw new Error('Project has already been added. If you want to scan a different branch, you must delete this project first.')
        }

        // Step 3. Persist the new project in the database
        const projectRecord = await SoftwareProjectRepository.addNewProject({
            fullName: gitHubJson.full_name,
            ownerName: gitHubJson.owner.login,
            branchName: branchOrDefaultName,
            projectName: gitHubJson.name,
            description: gitHubJson.description,
            htmlUrl: gitHubJson.html_url,
        });

        // Step 4. Dispatch a new scan of the repo.
        await ProjectScanService.disaptchProjectScan(projectRecord);

        return projectRecord;
    }

    // async deleteProjectById(softwareProjectId: number): Promise<ISoftwareProjectRecord> {
    //     const projectScanService = new ProjectScanService(this.connection);

    //     await projectScanService.deleteProjectScansByProjectId(softwareProjectId);
    //     return this.softwareProjectRepository.deleteProjectRecordByProjectId(softwareProjectId);
    // }

    static async listProjectsWithLatestScanByTag(tag: string): Promise<SoftwareProjectWithLatestScan[]> {
        return SoftwareProjectRepository.listProjectsWithLatestScanByTag(tag);
    }
}
