'use server'

import { Box, Link, List, ListItem, Typography } from "@mui/material";
// import { db } from "../../database/db";
import { useEffect } from "react";
import { DbConnection } from "../../database/db";
import type { ISoftwareProject } from "../../types/software-project";
import type { ApiResponse } from "../../types/api";
import DispatchProjectForm from "../../components/AddProjectForm";
import ProjectsList from "../../components/software-projects/ProjectsList";

export default async function ProjectsPage() {
    let projects: ISoftwareProject[] = [];

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/projects`, { next: { revalidate: 5 } })

        const json = await response.json() as ApiResponse<ISoftwareProject[]>
        projects = json.data;

    } catch (error) {
        throw error
    }

    return (
        <main>
            <Typography variant='h6'>My Projects</Typography>
            <DispatchProjectForm />
            <ProjectsList projects={projects} />
        </main>
    )
}
