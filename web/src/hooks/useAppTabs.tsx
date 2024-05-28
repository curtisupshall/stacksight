import { usePathname } from "next/navigation";
import { useMemo } from "react";

export interface ITab {
    label: string;
    href: string,
    matcherKey: keyof typeof APP_TAB_MATCHER
}

type AppTabMatcherKey = 
    | 'DASHBOARD'
    | 'PROJECTS'
    | 'PROJECT_SCANS'
    | 'PROJECT_DETAILS'

type AppTabMatcherEntry = {
    pattern: RegExp,
    overridesBreadcrumbs?: boolean
}

export const APP_TAB_MATCHER: Record<AppTabMatcherKey, AppTabMatcherEntry> = {
    'DASHBOARD': {
        pattern: /\/dashboard$/,
    },
    'PROJECTS': {
        pattern: /\/projects$/,
    },
    'PROJECT_SCANS': {
        overridesBreadcrumbs: true,
        pattern: /\/projects\/[a-zA-Z_0-9\-]*\/[a-zA-Z_0-9\-]*\/scans$/,
    },
    'PROJECT_DETAILS': {
        pattern: /\/projects\/[a-zA-Z_0-9\-]*\/[a-zA-Z_0-9\-]*$/,
    }
} as const;

export default function useAppTabs(tabs: ITab[]) {
    const pathname = usePathname();

    const currentTab: number = useMemo(() => {
        if (!pathname) {
            return -1
        }

        return tabs.findIndex((tab) => {
            return APP_TAB_MATCHER[tab.matcherKey].pattern.test(pathname)
        })
    }, [pathname])

    return currentTab;
}
