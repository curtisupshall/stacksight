'use server'

import { Box, Card, Stack } from "@mui/material";

import { ProjectScanRecordWithRelations } from "@/types/project-scan";
import ProjectStatusIndicator from "../software-projects/status/ProjectStatusIndicator";
import ProjectScansListCardActions from "./ProjectScansListCardActions";

interface IProjectScanListCardProps {
    scan: ProjectScanRecordWithRelations;
}

export default async function ProjectScansListCard(props: IProjectScanListCardProps) {
    return (
        <Card component='li' sx={{ p: 2 }}>
            <Stack direction='row' gap={1}>
                <Box flex={2}>
                    <Stack direction='row' gap={1.5} alignItems='center'>
                        <ProjectStatusIndicator scan={props.scan} />
                    </Stack>
                </Box>
                <Box>
                    <ProjectScansListCardActions {...props} />
                </Box>
            </Stack>
        </Card>
    )
}
