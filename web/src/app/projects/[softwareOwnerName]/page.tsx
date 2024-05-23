'use server'

import { Box, Typography } from "@mui/material";
import { DbConnection } from "@/server/database/db";
import { SoftwareProjectService } from "@/server/services/software-project-service";
import AddProjectForm from "@/components/AddProjectForm";
import ProjectsList from "@/components/software-projects/ProjectsList";
import { notFound } from "next/navigation";

export default async function SoftwareOwnerPage({ params }: { params: { softwareOwnerName: string }}) {
    const connection = new DbConnection();
    const { softwareOwnerName } = params;

    try {
        await connection.open();

        const softwareProjectService = new SoftwareProjectService(connection);
        const projects = await softwareProjectService.listProjectsByOwnerName(softwareOwnerName)

        if (!projects.length) {
            notFound();
        }

        await connection.commit();

        return (
            <section>
                <Typography variant='h4' mb={6}><strong>{softwareOwnerName}</strong></Typography>
                <Typography variant='h6' mb={2}>Projects</Typography>
                <Box mb={2}>
                    <AddProjectForm />
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
