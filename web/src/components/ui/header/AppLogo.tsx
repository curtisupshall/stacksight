import { Box } from "@mui/material"
import Link from "next/link";

const AppLogo = () => {
    return (
        <Box component={Link} href='/projects' sx={(theme) => ({ maxWidth: 120, fill: theme.palette.primary.main })} display='flex'>
            <h1>stacksight</h1>
        </Box>
    );
}

export default AppLogo
