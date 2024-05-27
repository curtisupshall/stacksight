'use client'

import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material"
import NextLink from "next/link";
import AppLogo from "./AppLogo";
import { useSearchParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import useAppBreadcrumbs from "@/hooks/useAppBreadcrumbs";

const HeaderNav = () => {
    const breadcrumbs = useAppBreadcrumbs();
    
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
                        <Link component={NextLink} underline="hover" color="inherit" href={breadcrumb.href}>
                            {breadcrumb.label}
                        </Link>

                    )
                })}
            </Breadcrumbs>
        </Stack>
    );
}

export default HeaderNav
