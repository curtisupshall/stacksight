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

    async addOrganizationByName(organizationName: string): Promise<ISoftwareOrganizationRecord> {
        // Step 1. Get information about the org from GitHub
        const orgResponse = await fetch(`https://api.github.com/users/${organizationName}`);
        const orgJson = await orgResponse.json() as any;

        // Step 2. Create the org record
        const organization: ICreateSoftwareOrganizationRecord = {
            name: organizationName,
            avatar_url: orgJson.avatar_url,
            full_name: orgJson.name,
            bio: orgJson.bio,
            html_url: orgJson.repos_url,
        }

        return this.organizationRepository.addOrganization(organization);
    }

    async listOrganizations(): Promise<ISoftwareOrganizationRecord[]> {
        return this.organizationRepository.listOrganizations();
    }
}
