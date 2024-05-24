'use server'

import {
    Box,
    Container, ContainerProps,
    Stack,
    Typography
} from "@mui/material"

import AppMenu from "./AppMenu";
import Search from "./Search";
import HeaderNav from "./HeaderNav";
import SearchIcon from "@mui/icons-material/Search";

const Header = (props: ContainerProps) => {
    return (
        <>
            <Box sx={{ mb: 0 }}>
                <Container {...props}>
                    <Stack direction='row' py={2} alignItems='center' justifyContent='space-between' gap={4}>
                        <HeaderNav />                        
                        <Stack gap={1} direction='row' alignItems='center' mx={-1}>
                            <Search />
                            <AppMenu />
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default Header
