'use server'

import { Box, Typography } from "@mui/material";
import type { ISoftwareProject } from "../../types/software-project";
import DispatchProjectForm from "../../components/AddProjectForm";
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
                <Typography variant='h4' mb={6}><strong>All Projects</strong></Typography>
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
