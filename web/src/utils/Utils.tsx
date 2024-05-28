import { IProjectScan } from "@/types/project-scan";
import { SOFTWARE_CATEGORIES, SOFTWARE_LIBRARIES, SOFTWARE_LIBRARIES_BY_CATEGORY, SoftwareCategory, SoftwareCategorySlug, SoftwareLibrary, SoftwareLibrarySlug } from "../constants/libs";
import { ISoftwareProject, SoftwareProjectStatus } from "../types/software-project";


export const getProjectStatus = (scan: IProjectScan): SoftwareProjectStatus => {
    let status: SoftwareProjectStatus = 'PENDING';

    if (scan.dispatched_at) {
        status = 'SCANNING'
    }

    if (scan.completed_at) {
        status = 'SUCCEEDED'
    }

    if (scan.aborted_at) {
        status = 'FAILED'
    }

    return status;
}

export const categorizeProjectTags = (tags: SoftwareLibrarySlug[]): (SoftwareCategory & { libraries: SoftwareLibrary[] })[]  => {
    // const visibleCategories: SoftwareCategorySlug[] = Array.from(
    //     tags.reduce((acc: Set<SoftwareCategorySlug>, tag: SoftwareLibrarySlug) => {
    //         const category: SoftwareCategorySlug | null = Object.entries()

    //         return acc;
    //     }, new Set<SoftwareCategorySlug>())
    // );

    return Object
        .entries(SOFTWARE_CATEGORIES)
        .map(([categorySlug, category]: [string, SoftwareCategory]) => {
            return {
                ...category,
                libraries: tags
                    .filter((tag) => SOFTWARE_LIBRARIES_BY_CATEGORY[categorySlug].includes(tag))
                    .map((tag) => SOFTWARE_LIBRARIES[tag])
            };
        })
        .filter((category) => {
            return category.libraries.length > 0;
        });
    
}

export const formatDocsUrl = (url: string | undefined): string => {
    if (!url) {
        return '';
    }

    try {
        const urlObject = new URL(url);
        return urlObject.hostname;
    } catch (error) {
        console.error('Invalid URL:', error);
        return '';
    }
}
