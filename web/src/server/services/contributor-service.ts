import { DbConnection } from "../database/db";
import { BaseService } from "./base-service";
import { SQSClient, SendMessageCommand, SendMessageRequest } from "@aws-sdk/client-sqs";
import { SoftwareProjectService } from "./software-project-service";
import { ISoftwareProjectRecord } from "@/types/software-project";
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
}
