import { Avatar, Badge, Box, Button, ButtonBase, Collapse, Divider, Icon, IconButton, InputAdornment, ListItemAvatar, ListItemText, Menu, MenuItem, TextField, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";

const AppMenu = () => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const isSignedIn = false;
    const avatarSrc = isSignedIn ? '' : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleSignIn = () => {
        handleClose();
    }

    const handleLogout = () => {
        handleClose()
    }

    return (
        <>
            <Button sx={{ borderRadius: 56 }} onClick={(event) => {
                setAnchorEl(event.currentTarget);
            }}>
                <MenuIcon />
                <Badge color='primary' badgeContent={1}>
                    <Avatar src={undefined} sx={{ ml: 1 }} />
                </Badge>
            </Button>
            <Menu
                id='header-profile-menu'
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                MenuListProps={{

                    sx: { minWidth: 250 }
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorEl={anchorEl}
            >
                {isSignedIn ? (
                    [
                        (<MenuItem key={'messages'} component={Link} href='/messages'>
                            <Badge badgeContent={1} variant='dot' color='primary'>
                                <Typography component='span'>Messages</Typography>
                            </Badge>
                        </MenuItem>),
                        (<MenuItem onClick={handleClose} component={Link} href='/account' key='account'>Account</MenuItem>),
                        (<MenuItem onClick={handleLogout} key='logout'>Log out</MenuItem>),
                        
                    ]
                ) : (
                    [
                        <MenuItem onClick={handleSignIn} key='signup'><strong>Sign up</strong></MenuItem>,
                        <MenuItem onClick={handleSignIn} key='signin'>Sign in</MenuItem>,
                    ]
                )}
            </Menu>
        </>
    )
}

export default AppMenu
