import { Avatar, Badge, Button, Menu, MenuItem, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";

import { auth } from "@/auth"
import { Session } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

interface IAppMenuProps {
    session: Session | undefined
}

const AppMenu = (props: IAppMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const { session } = props;

    const isSignedIn = Boolean(session?.user)
    const avatarSrc = session?.user?.image ?? undefined

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleSignIn = () => {
        signIn('github')
        handleClose();
    }

    const handleLogout = () => {
        signOut();
        handleClose()
    }

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
                        (<MenuItem onClick={handleLogout} key='logout'>Log out</MenuItem>),
                        
                    ]
                ) : (
                    [
                        <MenuItem onClick={handleSignIn} key='signin'>Sign in</MenuItem>,
                    ]
                )}
            </Menu>
        </>
    )
}

export default AppMenu
