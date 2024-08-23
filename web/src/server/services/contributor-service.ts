import { ContributorRepository } from "../repositories/contributor-repository";
import { CreateProjectScanContributorRecord } from "@/types/contributor";

export class ContributorService {
    static async createProjectScanContributors(contributors: CreateProjectScanContributorRecord[]) {
        return ContributorRepository.createProjectScanContributors(contributors);
    }

    // async getContributorsByProjectScanId(projectScanId: number) {
    //     return this.contributorRepository.getContributorsByProjectScanId(projectScanId);
    // }

    // async deleteContributorsByProjectId(projectId: number): Promise<void> {
    //     return this.contributorRepository.deleteContributorsByProjectId(projectId);
    // }
}
