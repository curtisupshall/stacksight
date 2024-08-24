import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
import updateLocale from "dayjs/plugin/updateLocale"

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    relativeTime: {
        future: "in %s",
        past: "%s",
        s: 'Now',
        m: "1m ago",
        mm: "%dm ago",
        h: "1h ago",
        hh: "%dh ago",
        d: "1d ago",
        dd: "%dd ago",
        M: "1mo ago",
        MM: "%dmo ago",
        y: "1y ago",
        yy: "%dy ago"
    }
});

import { ProjectScanRecord } from "@/types/project-scan";
import { SOFTWARE_CATEGORIES, SOFTWARE_LIBRARIES, SOFTWARE_LIBRARIES_BY_CATEGORY, SoftwareCategory, SoftwareCategorySlug, SoftwareLibrary, SoftwareLibrarySlug } from "../constants/libs";
import { SoftwareProjectStatus } from "../types/software-project";

export const getProjectStatus = (scan?: ProjectScanRecord | null): SoftwareProjectStatus => {
    let status: SoftwareProjectStatus = 'PENDING';

    if (scan?.dispatchedAt) {
        status = 'SCANNING'
    }

    if (scan?.completedAt) {
        status = 'SUCCEEDED'
    }

    if (scan?.abortedAt) {
        status = 'FAILED'
    }

    return status;
}

export const categorizeProjectTags = (tags: SoftwareLibrarySlug[]): (SoftwareCategory & { libraries: (SoftwareLibrary & { slug: string })[] })[]  => {
    return Object
        .entries(SOFTWARE_CATEGORIES)
        .map(([categorySlug, category]: [string, SoftwareCategory]) => {
            return {
                ...category,
                libraries: tags
                    .filter((tag) => SOFTWARE_LIBRARIES_BY_CATEGORY[categorySlug].includes(tag))
                    .map((tag) => ({ ...SOFTWARE_LIBRARIES[tag], slug: tag }))
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

export const getRelativeTime = (timestamp: string | null): string => {
    return dayjs.utc(timestamp).fromNow()
}