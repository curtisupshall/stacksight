import { DbConnection } from "../database/db";
import { OrganizationRepository } from "../repositories/organization-repository";
import { BaseService } from "./base-service";
import { ICreateSoftwareOrganizationRecord, ISoftwareOrganizationRecord } from "@/types/organization";
import { ProjectScanService } from "./project-scan-service";

const ORG_NUM_REPOS_PER_PAGE = 100;

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

    async scanOrganizationById(softwareOrganizationId: number) {
        const projectScanService = new ProjectScanService(this.connection);

        // Step 1. Get the org record from the database
        const organization = await this.organizationRepository.getOrganizationById(softwareOrganizationId);

        if (!organization) {
            throw new Error('Organization could not be found')
        }

        // Step 2. Determine the number of repos belonging to the org.
        const orgResponse = await fetch(`https://api.github.com/users/${organization.name}`);
        const orgJson = await orgResponse.json() as any;

        const numRepos = orgJson.public_repos;
        const numPages = Math.ceil(numRepos / ORG_NUM_REPOS_PER_PAGE);
        const repoPageRequests = [...Array(numPages).keys()].map((index) => {
            return `https://api.github.com/users/${organization.name}/repos?page=${index + 1}&per_page=${ORG_NUM_REPOS_PER_PAGE}`;
        });

        // Step 3. Fetch all of the repositories belonging to the org
        const pageResults = await Promise.all(repoPageRequests.map((requestUrl) => {
            return fetch(requestUrl).then((response) => {
                return response.json()
            })
        }));

        const repositories: any[] = pageResults.reduce((acc, page) => [...acc, ...page], []);

        return Promise.all(repositories.map((repo) => {
            return projectScanService
        }))
    }
}
