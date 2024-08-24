'use client'

import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { SoftwareProjectWithLatestScan } from "@/types/software-project";
import { scanProject } from "../../server/actions/projectActions";

export default function ProjectsListCardActions(props: SoftwareProjectWithLatestScan) {
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
                    <input type='hidden' name='softwareProjectId' value={props.softwareProjectId} />
                    <MenuItem component='button' type='submit'>Scan Now</MenuItem>
                </form>
                {/* <form action={deleteProject}> */}
                <form>
                    <input type='hidden' name='softwareProjectId' value={props.softwareProjectId} />
                    <MenuItem component='button' type='submit'>Delete Project</MenuItem>
                </form>
            </Menu>
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                <MoreVert />
            </IconButton>
        </>
    )
}
