'use server'

import { Box, Stack, Typography } from "@mui/material";
import type { ISoftwareProject } from "../../types/software-project";
import AddProjectForm from "../../components/AddProjectForm";
import ProjectsList from "../../components/software-projects/ProjectsList";
import { SoftwareProjectService } from "../../server/services/software-project-service";
import { DbConnection } from "@/server/database/db";

export default async function ProjectsPage() {
    const connection = new DbConnection();

    try {
        await connection.open();

        const softwareProjectService = new SoftwareProjectService(connection);
        const projects = await softwareProjectService.listProjects();

        await connection.commit();

        return (
            <section>
                <Stack alignItems='center' mb={6} direction='row' justifyContent='space-between'>
                    <Typography variant='h4' mb={0}><strong>All Projects</strong></Typography>
                    <AddProjectForm />
                </Stack>
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
