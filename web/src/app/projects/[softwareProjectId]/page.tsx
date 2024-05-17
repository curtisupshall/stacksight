'use server'

import { Box, Link, List, ListItem, Stack, Typography } from "@mui/material";
import { DbConnection } from "../../../server/database/db";
import { SoftwareProjectService } from "../../../server/services/software-project-service";
import { notFound } from "next/navigation";
import ProjectBranch from "../../../components/software-projects/ProjectBranch";
import ProjectStatusIndicator from "../../../components/software-projects/ProjectStatusIndicator";
import ProjectScanStatus from "../../../components/software-projects/ProjectScanStatus";
import { getProjectStatus } from "../../../utils/Utils";
import ProjectTechStack from "../../../components/tech-stack/ProjectTechStackList";

export default async function SoftwareProjectPage({ params }: { params: { softwareProjectId: string }}) {
    
    const softwareProjectId = Number(params.softwareProjectId);

    const connection = new DbConnection();

    try {
        await connection.open();

        const softwareProjectService = new SoftwareProjectService(connection);
        const project = await softwareProjectService.getProjectById(softwareProjectId);
        if (!project) {
            return notFound();
        }

        await connection.commit();

        const repoFullName = `${project.owner_name}/${project.project_name}`;

        return (
            <section>
                <Box mb={5}>
                    <Typography variant='h3' mb={1}>{repoFullName}</Typography>
                    <Typography mb={1}>{project.description}</Typography>
                    <Stack direction='row' gap={1} alignItems='center'>
                        <ProjectBranch {...project} />
                        <ProjectScanStatus project={project} />
                        <ProjectStatusIndicator status={getProjectStatus(project)} />
                    </Stack>
                </Box>
                <ProjectTechStack tags={project.tags ?? []} />
            </section>
        )
    } catch (error) {
        connection.rollback();
        throw error
    } finally {
        connection.release();
    }
}
