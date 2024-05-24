import { SOFTWARE_LIBRARIES, SoftwareLibrary } from "@/constants/libs";
import { DbConnection } from "../database/db";
import { SoftwareOwnerRepository } from "../repositories/software-owner-repository";
import { SoftwareProjectRepository } from "../repositories/software-project-repository";
import { BaseService } from "./base-service";
import { ISoftwareOwner } from "@/types/software-owner";
import { ISoftwareProject } from "@/types/software-project";

export interface ISearchResponse {
    owners: ISoftwareOwner[]
    projects: ISoftwareProject[]
    technologies: (SoftwareLibrary & { slug: string })[]
}

export class SearchService extends BaseService {
    softwareProjectRepository: SoftwareProjectRepository;
    softwareOwnerRepository: SoftwareOwnerRepository;

    constructor(connection: DbConnection) {
        super(connection);

        this.softwareProjectRepository = new SoftwareProjectRepository(connection);
        this.softwareOwnerRepository = new SoftwareOwnerRepository(connection);
    }

    async searchTechnologiesByKeyword(keyword: string) {
        const sanitizedKeyword = keyword.toLowerCase().trim();

        const libraryNames = Object.keys(SOFTWARE_LIBRARIES);

        return libraryNames
            .filter((library) => {
                return library.includes(sanitizedKeyword)
            })
            .map((librarySlug) => ({ slug: librarySlug, ...SOFTWARE_LIBRARIES[librarySlug] }))
    }

    async searchByKeyword(keyword: string): Promise<ISearchResponse> {
        const owners = await this.softwareOwnerRepository.searchOwnersByName(keyword);
        const projects = await this.softwareProjectRepository.searchProjectsByFullName(keyword);
        const technologies = await this.searchTechnologiesByKeyword(keyword);

        return {
            owners,
            projects,
            technologies
        }
    }
}
