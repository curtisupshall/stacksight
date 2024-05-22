'use client'

import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import type { ISoftwareProject } from "../../types/software-project";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { scanProject } from "../../server/actions/projectActions";

export default function ProjectsListCardActions(props: ISoftwareProject) {
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
                <form action={scanProject}>
                    <input type='hidden' name='softwareProjectId' value={props.software_project_id} />
                    <MenuItem component='button' type='submit'>Scan Now</MenuItem>
                </form>
            </Menu>
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                <MoreVert />
            </IconButton>
        </>
    )
}
