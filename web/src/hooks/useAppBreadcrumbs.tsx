import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { APP_TAB_MATCHER } from "./useAppTabs";

export interface IBreadcrumb {
    label: string;
    href: string;
}

const breadcrumbMatchers = [
    {
        label: 'Projects',
        pattern: /\/projects$/
    },
    {
        label: 'Dashboard',
        pattern: /\/dashboard$/
    },
    {
        label: 'Frameworks',
        pattern: /\/tags$/
    },
] as const;

const getBreadcrumbName = (path: string): string | undefined => {
    return breadcrumbMatchers.find((matcher) =>  matcher.pattern.test(path))?.label
}

export default function useAppBreadcrumbs() {
    const pathname = usePathname();

    const breadcrumbs: IBreadcrumb[] = useMemo(() => {
        const crumbs: IBreadcrumb[] = [];

        pathname?.split('/').reduce(((previousPath, pathItem: string) => {
            const path = [previousPath, pathItem].join('/')
            const matchesTab = Object.values(APP_TAB_MATCHER).some((entry) => entry.pattern.test(path) && entry.overridesBreadcrumbs);

            if (pathItem && !matchesTab) {
                const label = getBreadcrumbName(path) ?? pathItem;
    
                crumbs.push({
                    label,
                    href: path
                })
            }
    
            return path;
        }))

        return crumbs;
    }, [pathname])

    return breadcrumbs;
}
