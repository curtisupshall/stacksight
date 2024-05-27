'use server'

import { Box, Grid, Link, List, ListItem, Stack, Typography } from "@mui/material";
import { DbConnection } from "../../../../server/database/db";
import { SoftwareProjectService } from "../../../../server/services/software-project-service";
import { notFound } from "next/navigation";
import ProjectBranch from "../../../../components/software-projects/ProjectBranch";
import ProjectStatusIndicator from "../../../../components/software-projects/ProjectStatusIndicator";
import ProjectScanStatus from "../../../../components/software-projects/ProjectScanStatus";
import { getProjectStatus } from "../../../../utils/Utils";
import ProjectTechStack from "../../../../components/tech-stack/ProjectTechStackList";
import ProjectLanguages from "../../../../components/tech-stack/ProjectLanguages";
import { OpenInNew } from "@mui/icons-material";

export default async function SoftwareProjectPage({ params }: { params: { softwareProjectName: string, softwareOwnerName: string }}) {
    
    const { softwareProjectName, softwareOwnerName } = params;
    const repoFullName = [softwareOwnerName, softwareProjectName].join('/')

    const connection = new DbConnection();

    try {
        await connection.open();

        const softwareProjectService = new SoftwareProjectService(connection);
        const project = await softwareProjectService.getProjectByFullName(repoFullName);

        if (!project) {
            return notFound();
        }

        await connection.commit();

        return (
            <section>
                <Box mb={5}>
                    <Typography variant='h3' mb={1}>{repoFullName}</Typography>
                    <Typography mb={1}>{project.description}</Typography>
                    <Stack direction='row' gap={1} alignItems='center'>
                        <ProjectBranch {...project} />
                        <ProjectScanStatus project={project} />
                        <ProjectStatusIndicator status={getProjectStatus(project)} />
                        <Link href={project.html_url} target='_blank'>
                            <Stack direction='row'>
                                <Typography>View Source</Typography>
                                <OpenInNew />
                            </Stack>
                        </Link>
                    </Stack>
                </Box>
                <Grid container columns={2}>
                    <Grid item xs={1}>
                        
                    </Grid>
                    <Grid item xs={1}>
                        <Stack gap={1}>
                            <Box>
                                <Typography variant='h5'>Languages</Typography>
                                <ProjectLanguages languages={project.languages ?? []} />
                            </Box>
                            <Box>
                                <Typography variant='h5'>Frameworks</Typography>
                                <ProjectTechStack tags={project.tags ?? []} />
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </section>
        )
    } catch (error) {
        connection.rollback();
        throw error
    } finally {
        connection.release();
    }
}
