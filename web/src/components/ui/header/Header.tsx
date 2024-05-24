'use server'

import { Avatar, Box, Button, ButtonBase, Collapse, Container, ContainerProps, Divider, Icon, IconButton, InputAdornment, ListItemAvatar, ListItemText, Menu, MenuItem, Paper, TextField } from "@mui/material"

import HeartIcon from '@mui/icons-material/FavoriteBorder';
import AppMenu from "./AppMenu";
import Search from "./Search";
import HeaderNav from "./HeaderNav";

const Header = (props: ContainerProps) => {
    const showFavorites = true;
    const showSearch = true;
    const stickyHeader = false;
    const headerProps = stickyHeader ? { position: 'sticky', top: 0, zIndex: 10 } : {}

    return (
        <>
            <Box sx={{ mb: 0, ...headerProps }}>
                <Container {...props}>
                    <Box py={2} display='flex' alignItems='center' justifyContent='space-between' gap={4}>
                        <HeaderNav />
                        <div />
                        {showSearch && (
                            <Search />
                        )}
                        <Box display='flex' alignItems='center' mx={-1}>
                            {/* {showSaveButton && (
                                <Box px={3}>
                                    <Button variant='outlined' sx={{ borderRadius: 8 }}>Save and Exit</Button>
                                </Box>
                            )} */}
                            <AppMenu />
                        </Box>
                    </Box>
                    {/* {showCategories && (
                        <ProductCategoriesList />
                    )} */}
                    {/*<Divider orientation="horizontal" />*/}
                </Container>
            </Box>
        </>
    );
}

export default Header
