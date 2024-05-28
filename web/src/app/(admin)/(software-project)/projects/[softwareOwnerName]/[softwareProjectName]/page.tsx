'use server'

import { Box, Grid, Link, List, ListItem, Stack, Typography } from "@mui/material";
import { DbConnection } from "../../../../../../server/database/db";
import { SoftwareProjectService } from "../../../../../../server/services/software-project-service";
import { notFound } from "next/navigation";
import ProjectBranch from "../../../../../../components/software-projects/status/ProjectBranch";
import ProjectScanStatus from "../../../../../../components/software-projects/status/ProjectStatus";
import { getProjectStatus } from "../../../../../../utils/Utils";
import ProjectTechStack from "../../../../../../components/tech-stack/ProjectTechStackList";
import ProjectLanguages from "../../../../../../components/tech-stack/ProjectLanguages";
import { OpenInNew } from "@mui/icons-material";
import ProjectStatus from "../../../../../../components/software-projects/status/ProjectStatus";
import ProjectCommitHash from "@/components/software-projects/status/ProjectCommitHash";

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
                    <Stack direction='row'>
                        <ProjectBranch {...project} />
                        <ProjectCommitHash {...project} />
                    </Stack>
                    <Link href={project.html_url} target='_blank'>
                        <Stack direction='row'>
                            <Typography>View Source</Typography>
                            <OpenInNew />
                        </Stack>
                    </Link>
                </Box>
                <Grid container columns={2}>
                    <Grid item xs={1}>
                        
                    </Grid>
                    <Grid item xs={1}>
                        <Stack gap={1}>
                            <Box>
                                <Typography variant='h5'>Languages</Typography>
                                <ProjectLanguages languages={project.last_scan.languages ?? []} />
                            </Box>
                            <Box>
                                <Typography variant='h5'>Frameworks</Typography>
                                <ProjectTechStack tags={project.last_scan.tags ?? []} />
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
