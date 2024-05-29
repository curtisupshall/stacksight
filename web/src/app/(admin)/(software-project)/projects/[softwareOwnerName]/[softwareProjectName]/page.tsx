'use server'

import { Alert, AlertTitle, Box, Divider, Grid, Link, List, ListItem, Stack, Typography } from "@mui/material";
import { DbConnection } from "../../../../../../server/database/db";
import { SoftwareProjectService } from "../../../../../../server/services/software-project-service";
import { notFound } from "next/navigation";
import ProjectBranch from "../../../../../../components/software-projects/status/ProjectBranch";
import { getProjectStatus } from "../../../../../../utils/Utils";
import ProjectTechStack from "../../../../../../components/tech-stack/ProjectTechStackList";
import ProjectLanguages from "../../../../../../components/tech-stack/ProjectLanguages";
import { OpenInNew } from "@mui/icons-material";
import ProjectCommitHash from "@/components/software-projects/status/ProjectCommitHash";
import ProjectStatusIndicator from "@/components/software-projects/status/ProjectStatusIndicator";
import ResultsAlert from "@/components/software-projects/status/ResultsAlert";
import { ProjectScanService } from "@/server/services/project-scan-service";

export default async function SoftwareProjectPage({ params }: { params: { softwareProjectName: string, softwareOwnerName: string }}) {
    
    const { softwareProjectName, softwareOwnerName } = params;
    const repoFullName = [softwareOwnerName, softwareProjectName].join('/')

    const connection = new DbConnection();

    try {
        await connection.open();

        const softwareProjectService = new SoftwareProjectService(connection);
        const projectScanService = new ProjectScanService(connection);
        const project = await softwareProjectService.getProjectByFullName(repoFullName);

        if (!project) {
            return notFound();
        }

        const lastSuccessfulScan = await projectScanService.getLatestSuccessfulScanByProjectId(project?.software_project_id);
        const showResultsOutdatedAlert = project.last_scan?.software_project_scan_id !== lastSuccessfulScan?.software_project_scan_id;

        await connection.commit();

        return (
            <>
                <section>
                    <ResultsAlert visible={showResultsOutdatedAlert} />
                    <Box mb={3}>
                        <Typography variant='h3' mb={2}>{repoFullName}</Typography>
                        <Stack direction='row' gap={1}>
                            <ProjectStatusIndicator {...project} />
                            <ProjectBranch {...project} />
                            <ProjectCommitHash {...project} />
                        </Stack>
                    </Box>
                    
                    <Grid container columns={3} spacing={4}>
                        <Grid item xs={2}>
                            <Box>
                                <Typography variant='h6'>The Stack</Typography>
                                <ProjectTechStack tags={project.last_scan?.tags ?? []} />
                            </Box>
                        </Grid>
                        <Grid item xs={1}>
                            <Stack gap={1}>
                                <Box>
                                    <Typography variant='h6' mb={2}>About</Typography>
                                    <Typography>{project.description}</Typography>
                                    <Divider sx={{ my: 2 }} />
                                    <Typography variant='h6' mb={2}>Languages</Typography>
                                    <ProjectLanguages languages={project.last_scan?.languages ?? []} />
                                </Box>
                                
                            </Stack>
                        </Grid>
                    </Grid>
                </section>
            </>
        )
    } catch (error) {
        connection.rollback();
        throw error
    } finally {
        connection.release();
    }
}
