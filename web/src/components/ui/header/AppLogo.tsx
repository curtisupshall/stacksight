import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material"
import NextLink from "next/link";

const AppLogo = () => {
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
                <NextLink href={'/'}>
                    <img src={`/logo.png`} style={{ width: '48px', height: 'auto'  }} />
                </NextLink>
                <Link underline="hover" color="inherit" href="/">
                    Projects
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    bcgov
                </Link>
                <Typography color="text.primary">biohubbc</Typography>
            </Breadcrumbs>
        </Stack>
    );
}

export default AppLogo
