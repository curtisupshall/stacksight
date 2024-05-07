'use server'

import { List, ListItem, Typography } from "@mui/material";
// import { db } from "../../database/db";
import { useEffect } from "react";
import { DbConnection } from "../../database/db";
import type { ISoftwareProject } from "../../types/software-project";
import type { ApiResponse } from "../../types/api";
import DispatchProjectForm from "../../components/DispatchProjectForm";

export default async function ProjectsPage() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/projects`)
    const json = await response.json() as ApiResponse<ISoftwareProject[]>
    const projects = json.data;

    return (
        <div>
            <Typography variant='h6'>My Projects</Typography>
            <DispatchProjectForm />
            {JSON.stringify(projects)}
            <List>
                {projects.map((project: any) => {
                    return (
                        <ListItem>{JSON.stringify(project)}</ListItem>
                    )
                })}
            </List>
        </div>
    )
}
