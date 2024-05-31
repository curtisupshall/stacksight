import { DbConnection } from "../database/db";
import { BaseService } from "./base-service";
import { ContributorRepository } from "../repositories/contributor-repository";
import { IProjectScanContributor } from "@/types/contributor";

export class ContributorService extends BaseService {
    contributorRepository: ContributorRepository;

    constructor(connection: DbConnection) {
        super(connection);

        this.contributorRepository = new ContributorRepository(connection);
    }


    async addContributorsToProjectScan(projectScanId: number, contributors: IProjectScanContributor[]) {
        return this.contributorRepository.addContributorsToProjectScan(projectScanId, contributors);
    }

    async getContributorsByProjectScanId(projectScanId: number) {
        return this.contributorRepository.getContributorsByProjectScanId(projectScanId);
    }

    async deleteContributorsByProjectId(projectId: number): Promise<void> {
        return this.contributorRepository.deleteContributorsByProjectId(projectId);
    }
}
