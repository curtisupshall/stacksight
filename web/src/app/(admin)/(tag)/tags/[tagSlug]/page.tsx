'use server'

import { Box, Typography } from "@mui/material";
import { DbConnection } from "@/server/database/db";
import { SoftwareProjectService } from "@/server/services/software-project-service";
import AddProjectForm from "@/components/AddProjectForm";
import ProjectsList from "@/components/software-projects/ProjectsList";
import { notFound } from "next/navigation";
import { SOFTWARE_LIBRARIES } from "@/constants/libs";

export default async function SoftwareTagPage({ params }: { params: { tagSlug: string }}) {
    const connection = new DbConnection();
    const { tagSlug } = params;

    const libraryDetails = SOFTWARE_LIBRARIES[tagSlug]

    if (!libraryDetails) {
        notFound();
    }

    try {
        await connection.open();

        const softwareProjectService = new SoftwareProjectService(connection);
        const projects = await softwareProjectService.listProjectsByTag(tagSlug)

        await connection.commit();

        return (
            <section>
                <Typography variant='h4' mb={6}><strong>{libraryDetails.name}</strong></Typography>
                <Typography variant='h6' mb={2}>Projects</Typography>
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
