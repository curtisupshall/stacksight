'use client'

import { Avatar, Box, Button, ButtonBase, Collapse, Container, ContainerProps, Divider, Icon, IconButton, InputAdornment, ListItemAvatar, ListItemText, Menu, MenuItem, Paper, TextField } from "@mui/material"

import HeartIcon from '@mui/icons-material/FavoriteBorder';
import AppMenu from "./AppMenu";
import AppLogo from "./AppLogo";
import Search from "./Search";

const Header = (props: ContainerProps) => {
    const showFavorites = true;
    const showSearch = true;
    const stickyHeader = false;
    const paperProps = stickyHeader ? { position: 'sticky', top: 0, zIndex: 10 } : {}

    return (
        <>
            <Paper elevation={0} square sx={{ mb: 4, ...paperProps }}>
                <Container {...props}>
                    <Box py={2} display='flex' alignItems='center' justifyContent='space-between' gap={4}>
                        <AppLogo />
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
                            {showFavorites && (
                                <IconButton onClick={() => {}}>
                                    <HeartIcon />
                                </IconButton>
                            )}
                            <AppMenu />
                        </Box>
                    </Box>
                    {/* {showCategories && (
                        <ProductCategoriesList />
                    )} */}
                    {/*<Divider orientation="horizontal" />*/}
                </Container>
            </Paper>
        </>
    );
}

export default Header
