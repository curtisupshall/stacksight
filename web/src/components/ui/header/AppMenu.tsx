'use client'

import { Avatar, Badge, Button, Menu, MenuItem, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";

import { auth } from "@/auth"
import { Session } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import UserAvatar from "@/components/auth/UserAvatar";
import SignInButton from "@/components/auth/SignInButton";
import SignOutButton from "@/components/auth/SignOutButton";

const AppMenu = () => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    
    const session = useSession();

    const isSignedIn = session.status === 'authenticated'
    const avatarSrc = session.data?.user?.image ?? undefined

    const handleClose = () => {
        setAnchorEl(null);
    }

    // const handleSignIn = () => {
    //     signIn('github')
    //     handleClose();
    // }

    // const handleLogout = () => {
    //     signOut();
    //     handleClose()
    // }

    return (
        <>
            <Button sx={{ borderRadius: 56 }} onClick={(event) => {
                setAnchorEl(event.currentTarget);
            }}>
                <MenuIcon />
                {/* <Badge color='primary' badgeContent={1}> */}
                    <Avatar src={avatarSrc} sx={{ ml: 1 }} />
                {/* </Badge> */}
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
                        // (<MenuItem key={'messages'} component={Link} href='/messages'>
                        //     <Badge badgeContent={1} variant='dot' color='primary'>
                        //         <Typography component='span'>Messages</Typography>
                        //     </Badge>
                        // </MenuItem>),
                        // (<MenuItem onClick={handleClose} component={Link} href='/account' key='account'>Account</MenuItem>),
                        (
                            <SignOutButton key='sign-out-button' />
                        ),
                        
                    ]
                ) : (
                    [
                        (
                            <SignInButton key='sign-in-button' />
                        ),
                    ]
                )}
            </Menu>
        </>
    )
}

export default AppMenu
