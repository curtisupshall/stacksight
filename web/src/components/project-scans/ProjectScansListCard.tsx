'use server'

import { Box, Breadcrumbs, Card, Chip, Divider, IconButton, Stack, Typography } from "@mui/material";

import { IProjectScanRecord } from "@/types/project-scan";
import ProjectStatusIndicator from "../software-projects/status/ProjectStatusIndicator";
import ProjectScansListCardActions from "./ProjectsListCardActions";

export default async function ProjectScansListCard(props: IProjectScanRecord) {
    return (
        <Card component='li' key={props.software_project_id} sx={{ p: 2 }}>
            <Stack direction='row' gap={1}>
                <Box flex={2}>
                    <Stack direction='row' gap={1.5} alignItems='center'>
                        
                        {/* <ProjectScanStatus project={props} /> */}
                        {/* <ProjectStatusIndicator {...props} /> */}
                        {JSON.stringify(props)}
                    </Stack>
                  
                </Box>

                <Box>
                    <ProjectScansListCardActions {...props} />
                </Box>
            </Stack>
        </Card>
    )
}
