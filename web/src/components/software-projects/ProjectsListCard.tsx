'use server'

import { Box, Card, Chip, Divider, IconButton, Stack, Typography } from "@mui/material";
import type { ISoftwareProject, SoftwareProjectStatus } from "../../types/software-project";
import Link from "next/link";
import ProjectsListCardActions from "./ProjectsListCardActions";
import { ForkRight, Print } from '@mui/icons-material';
import ProjectStatusIndicator from './ProjectStatusIndicator';
import ProjectScanStatus from './ProjectScanStatus';
import ProjectBranch from './ProjectBranch';
import { getProjectStatus } from '../../utils/Utils';

export default async function ProjectsListCard(props: ISoftwareProject) {
    const repoFullName = `${props.owner_name}/${props.project_name}`;
    const status: SoftwareProjectStatus = getProjectStatus(props);

    return (
        <Card component='li' key={props.software_project_id} sx={{ p: 2 }}>
            <Stack direction='row' gap={1}>
                <Box flex={2}>
                    <Stack direction='row' gap={1.5} alignItems='center'>
                        <Link href={`/projects/${props.software_project_id}`}>
                            <Typography variant='h6'>{repoFullName}</Typography>
                        </Link>
                        <ProjectStatusIndicator status={status} />
                        <ProjectBranch {...props} />
                    </Stack>
                    <Typography variant='body2'>{props.description}</Typography>
                    <ProjectScanStatus project={props} />
                </Box>
                {/* <Divider orientation='vertical' /> */}
                <Stack direction='row' gap={1} flex={3} pt={0.5}>
                    {props.tags?.filter(Boolean).map((tag) => (
                        <Chip size='small' label={tag} />
                    ))}
                </Stack>
                <Box>
                    <ProjectsListCardActions {...props} />
                </Box>
            </Stack>
        </Card>
    )
}
