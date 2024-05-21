import { Box, Stack, Typography } from "@mui/material"
import Link from "next/link";

const AppLogo = () => {
    return (
        <Stack
            direction='row'
            gap={1}
            alignItems='center'
            component={Link}
            href='/projects'
            sx={{
                color: 'inherit',
                textDecoration: 'none'
            }}
        >
            <img src={`/logo.png`} style={{ width: '56px', height: 'auto'  }} />
            <Typography
                variant='h1'
                fontSize={'2rem'}
                fontWeight={500}
                fontFamily={`"Red Hat Display", sans-serif`}
                lineHeight='unset'
            >
                StackSight
            </Typography>
        </Stack>
    );
}

export default AppLogo
