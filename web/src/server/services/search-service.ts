import { SOFTWARE_LIBRARIES } from "@/constants/libs";
import { DbConnection } from "../database/db";
import { SoftwareOwnerRepository } from "../repositories/software-owner-repository";
import { SoftwareProjectRepository } from "../repositories/software-project-repository";
import { BaseService } from "./base-service";

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

        console.log(libraryNames)

        return libraryNames
            .filter((library) => {
                return library.includes(sanitizedKeyword)
            })
            .map((librarySlug) => SOFTWARE_LIBRARIES[librarySlug])
    }

    async searchByKeyword(keyword: string) {
        const owners = await this.softwareOwnerRepository.searchOwnersByName(keyword);
        const projects = await this.softwareProjectRepository.searchProjectByFullName(keyword);
        const technologies = await this.searchTechnologiesByKeyword(keyword);

        return {
            owners,
            projects,
            technologies
        }
    }
}
