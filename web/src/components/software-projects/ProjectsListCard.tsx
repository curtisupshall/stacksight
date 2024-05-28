'use server'

import { Box, Breadcrumbs, Card, Chip, Divider, IconButton, Stack, Typography } from "@mui/material";
import type { ISoftwareProject, SoftwareProjectStatus } from "../../types/software-project";
import Link from "next/link";
import ProjectsListCardActions from "./ProjectsListCardActions";
import { ForkRight, Print } from '@mui/icons-material';
import ProjectStatus from './status/ProjectStatus';
import ProjectBranch from './status/ProjectBranch';
import { getProjectStatus } from '../../utils/Utils';

export default async function ProjectsListCard(props: ISoftwareProject) {
    return (
        <Card component='li' key={props.software_project_id} sx={{ p: 2 }}>
            <Stack direction='row' gap={1}>
                <Box flex={2}>
                    <Stack direction='row' gap={1.5} alignItems='center'>
                        <Breadcrumbs>
                            <Link href={`/projects/${props.owner_name}`}>
                                <Typography variant='h6'>{props.owner_name}</Typography>
                            </Link>
                            <Link href={`/projects/${props.owner_name}/${props.project_name}`}>
                                <Typography variant='h6'>{props.project_name}</Typography>
                            </Link>
                        </Breadcrumbs>
                        {/* <ProjectStatus project={props} /> */}
                    </Stack>
                    <Typography variant='body2'>
                        {props.description}
                    </Typography>
                </Box>
                {/* <Stack direction='row' gap={1} flex={3} pt={0.5}>
                    {props.tags?.filter(Boolean).map((tag) => (
                        <Chip size='small' label={tag} />
                    ))}
                </Stack> */}
                <Box>
                    <ProjectsListCardActions {...props} />
                </Box>
            </Stack>
        </Card>
    )
}
