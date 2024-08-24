'use server'

import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { SoftwareProjectService } from "../../../../../../server/services/software-project-service";
import { notFound } from "next/navigation";
import ProjectBranch from "../../../../../../components/software-projects/status/ProjectBranch";
import ProjectTechStack from "../../../../../../components/tech-stack/ProjectTechStackList";
import ProjectLanguages from "../../../../../../components/tech-stack/ProjectLanguages";
import ProjectStatusIndicator from "@/components/software-projects/status/ProjectStatusIndicator";
import ResultsAlert from "@/components/software-projects/status/ResultsAlert";
import { ProjectScanService } from "@/server/services/project-scan-service";
import ProjectContributors from "@/slots/ProjectContributors";
import ProjectCommitHash from "@/components/software-projects/status/ProjectCommitHash";

export default async function SoftwareProjectPage({ params }: { params: { softwareProjectName: string, softwareOwnerName: string }}) {
    
    const { softwareProjectName, softwareOwnerName } = params;
    const repoFullName = [softwareOwnerName, softwareProjectName].join('/')

    const project = await SoftwareProjectService.getProjectWithLatestScanByFullName(repoFullName);

    if (!project) {
        return notFound();
    }

    const lastSuccessfulScan = await ProjectScanService.getLatestSuccessfulScanWithRelationsByProjectId(project?.softwareProjectId)
        ?? null;
    
    const showResultsOutdatedAlert = project.scan?.softwareProjectScanId !== lastSuccessfulScan?.softwareProjectScanId;

    return (
        <>
            <section>
                <ResultsAlert visible={showResultsOutdatedAlert} />
                <Box mb={3}>
                    <Typography variant='h3' mb={2}>{repoFullName}</Typography>
                    <Stack direction='row' gap={1}>
                        <ProjectStatusIndicator scan={project.scan} />
                        <ProjectBranch project={project} />
                        <ProjectCommitHash commit={project.scan?.commit ?? null} />
                    </Stack>
                </Box>
                
                <Grid container columns={3} spacing={4}>
                    <Grid item xs={2}>
                        <Box>
                            <Typography variant='h6'>The Stack</Typography>
                            <ProjectTechStack
                                tags={project.scan?.tags?.map((record) => record.tag) ?? []}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Stack gap={1}>
                            <Box>
                                <Typography variant='h6' mb={2}>About</Typography>
                                <Typography>{project.description}</Typography>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant='h6' mb={2}>Languages</Typography>
                                <ProjectLanguages languages={project.scan?.languages ?? []} />
                                <Divider sx={{ my: 2 }} />
                                <Typography variant='h6' mb={2}>Contributors</Typography>
                                <ProjectContributors contributors={project.scan?.contributors ?? []} />
                            </Box>
                            
                        </Stack>
                    </Grid>
                </Grid>
            </section>
        </>
    )
}
