'use client'

import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material"
import NextLink from "next/link";
import AppLogo from "./AppLogo";
import { useSearchParams, usePathname } from "next/navigation";
import { useMemo } from "react";

interface IBreadcrumb {
    name: string;
    path: string;
}

const breadcrumbMatchers = [
    {
        name: 'Projects',
        pattern: /\/projects$/
    }
]

const getBreadcrumbName = (path: string): string | undefined => {
    return breadcrumbMatchers.find((matcher) =>  matcher.pattern.test(path))?.name
}

const HeaderNav = () => {
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
    
    return (
        <Stack
            direction='row'
            gap={1}
            alignItems='center'
            sx={{
                color: 'inherit',
                textDecoration: 'none',
            }}
        >
            <Breadcrumbs aria-label="breadcrumb">
                <AppLogo />
                {breadcrumbs.map((breadcrumb) => {
                    return (
                        <Link component={NextLink} underline="hover" color="inherit" href={breadcrumb.path}>
                            {breadcrumb.name}
                        </Link>

                    )
                })}
            </Breadcrumbs>
        </Stack>
    );
}

export default HeaderNav
