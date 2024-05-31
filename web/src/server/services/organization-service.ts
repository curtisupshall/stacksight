import { DbConnection } from "../database/db";
import { OrganizationRepository } from "../repositories/organization-repository";
import { BaseService } from "./base-service";
import { ICreateSoftwareOrganizationRecord, ISoftwareOrganizationRecord } from "@/types/organization";

export class OrganizationService extends BaseService {
    organizationRepository: OrganizationRepository;

    constructor(connection: DbConnection) {
        super(connection);

        this.organizationRepository = new OrganizationRepository(connection);
    }

    async addOrganization(organization: ICreateSoftwareOrganizationRecord): Promise<ISoftwareOrganizationRecord> {
        return this.organizationRepository.addOrganization(organization);
    }

    async listOrganizations(): Promise<ISoftwareOrganizationRecord[]> {
        return this.organizationRepository.listOrganizations();
    }
}
