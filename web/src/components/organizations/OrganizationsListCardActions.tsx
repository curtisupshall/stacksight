'use client'

import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { ISoftwareOrganizationRecord } from "@/types/organization";

export default function OrganizationsListCardActions(props: ISoftwareOrganizationRecord) {
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
                {/* <form action={scanOrganization}>
                    <input type='hidden' name='softwareOrganizationId' value={props.software_project_id} />
                    <MenuItem component='button' type='submit'>Scan Now</MenuItem>
                </form>
                <form action={deleteOrganization}>
                    <input type='hidden' name='softwareOrganizationId' value={props.software_project_id} />
                    <MenuItem component='button' type='submit'>Delete Organization</MenuItem>
                </form> */}
            </Menu>
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                <MoreVert />
            </IconButton>
        </>
    )
}
