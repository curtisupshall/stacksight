import { usePathname } from "next/navigation";
import { useMemo } from "react";

export interface IBreadcrumb {
    name: string;
    path: string;
}

const breadcrumbMatchers = [
    {
        name: 'Projects',
        pattern: /\/projects$/
    },
    {
        name: 'Scans',
        pattern: /\/projects\/[a-zA-Z_0-9\-]*\/[a-zA-Z_0-9\-]*\/scans$/
    }
]

const getBreadcrumbName = (path: string): string | undefined => {
    return breadcrumbMatchers.find((matcher) =>  matcher.pattern.test(path))?.name
}

export default function useAppBreadcrumbs() {
    const pathname = usePathname();

    const breadcrumbs: IBreadcrumb[] = useMemo(() => {
        const crumbs: IBreadcrumb[] = [];

        pathname?.split('/').reduce(((previousPath, pathItem: string) => {
            const path = [previousPath, pathItem].join('/')
            console.log('reading:', path)
            if (pathItem) {
                const name = getBreadcrumbName(path) ?? pathItem;
    
                crumbs.push({
                    name,
                    path
                })
            }
    
            return path;
        }))

        return crumbs;
    }, [pathname])

    return breadcrumbs;
}
