'use client'

import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";

export default function ProjectScansListCardActions(props: any) {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => handleClose()}
            >
                {/* <form action={scanProject}>
                    <input type='hidden' name='softwareProjectId' value={props.software_project_id} />
                    <MenuItem component='button' type='submit'>Scan Now</MenuItem>
                </form>
                <form action={deleteProject}>
                    <input type='hidden' name='softwareProjectId' value={props.software_project_id} />
                    <MenuItem component='button' type='submit'>Delete Project</MenuItem>
                </form> */}
            </Menu>
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                <MoreVert />
            </IconButton>
        </>
    )
}
