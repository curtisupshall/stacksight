'use server'

import { Box, Link, List, ListItem, Stack, Typography } from "@mui/material";
// import { db } from "../../database/db";
import { useEffect } from "react";
import { DbConnection } from "../../database/db";
import type { ISoftwareProject } from "../../types/software-project";
import type { ApiResponse } from "../../types/api";
import DispatchProjectForm from "../../components/AddProjectForm";
import ProjectsList from "../../components/software-projects/ProjectsList";
import { SoftwareProjectService } from "../../service/software-project-service";

export default async function ProjectsPage() {
    const connection = new DbConnection();

    try {
        await connection.open();

        const softwareProjectService = new SoftwareProjectService(connection);
        const projects = await softwareProjectService.listProjects();

        await connection.commit();

        return (
            <section>
                <Typography variant='h3' mb={6}><strong>My Projects</strong></Typography>
                <Box mb={2}>
                    <DispatchProjectForm />
                </Box>
                <ProjectsList projects={projects} />
            </section>
        )
    } catch (error) {
        connection.rollback();
        throw error
    } finally {
        connection.release();
    }
}
