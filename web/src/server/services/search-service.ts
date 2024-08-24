import { SOFTWARE_LIBRARIES, SoftwareLibrary } from "@/constants/libs";
import { SoftwareOwnerRepository } from "../repositories/software-owner-repository";
import { SoftwareProjectRepository } from "../repositories/software-project-repository";
import { ISoftwareOwner } from "@/types/software-owner";
import { SoftwareProjectWithLatestScan } from "@/types/software-project";

export interface ISearchResponse {
    owners: ISoftwareOwner[]
    projects: SoftwareProjectWithLatestScan[]
    technologies: (SoftwareLibrary & { slug: string })[]
}

export class SearchService {
    static async searchTechnologiesByKeyword(keyword: string) {
        const sanitizedKeyword = keyword.toLowerCase().trim();

        const libraryNames = Object.keys(SOFTWARE_LIBRARIES);

        return libraryNames
            .filter((library) => {
                return library.includes(sanitizedKeyword)
            })
            .map((librarySlug) => ({ slug: librarySlug, ...SOFTWARE_LIBRARIES[librarySlug] }))
    }

    static async searchByKeyword(keyword: string): Promise<ISearchResponse> {
        const owners = await SoftwareOwnerRepository.searchOwnersByName(keyword);
        const projects = await SoftwareProjectRepository.searchProjectsWithLatestScanByFullName(keyword);
        const technologies = await this.searchTechnologiesByKeyword(keyword);

        return {
            owners,
            projects,
            technologies
        }
    }
}
