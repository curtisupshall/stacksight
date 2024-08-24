'use server'

import { Box, Breadcrumbs, Card, Stack, Typography } from "@mui/material";
import type { SoftwareProjectWithLatestScan } from "../../types/software-project";
import Link from "next/link";
import ProjectsListCardActions from "./ProjectsListCardActions";
import ProjectStatusIndicator from "./status/ProjectStatusIndicator";

export default async function ProjectsListCard(props: SoftwareProjectWithLatestScan) {
    return (
        <Card component='li' sx={{ p: 2 }}>
            <Stack direction='row' gap={1}>
                <Box flex={2}>
                    <Stack direction='row' gap={1.5} alignItems='center'>
                        <Breadcrumbs>
                            <Link href={`/projects/${props.ownerName}`}>
                                <Typography variant='h6'>{props.ownerName}</Typography>
                            </Link>
                            <Link href={`/projects/${props.ownerName}/${props.projectName}`}>
                                <Typography variant='h6'>{props.projectName}</Typography>
                            </Link>
                        </Breadcrumbs>
                        <Link href={`/projects/${props.fullName}/scans`}>
                            <ProjectStatusIndicator scan={props.scan} />
                        </Link>
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
