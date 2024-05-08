'use server'

import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import type { ISoftwareProject } from "../../types/software-project";
import Link from "next/link";
import ProjectsListCardActions from "./ProjectsListCardActions";
import { Print } from '@mui/icons-material';

export default async function ProjectsListCard(props: ISoftwareProject) {
    const repoFullName = `${props.owner_name}/${props.project_name}`;
    const lastScanDispatchDate = dayjs(props.last_scan_dispatched_at);

    return (
        <Card component='li' key={props.software_project_id} sx={{ p: 2 }}>
            <Stack direction='row'>
                <Box flex={1}>
                    <Link target="_blank" href={props.html_url}>
                        <Typography variant='h6'>{repoFullName}</Typography>
                    </Link>
                    <Typography variant='body2'>{props.description}</Typography>
                    <Typography variant='caption'>
                        <span>Last scanned: </span>
                        {props.last_scan_dispatched_at ? (
                            <span title={lastScanDispatchDate.format('MMM D, YYYY h:mmA')}>
                                {lastScanDispatchDate.toNow()}
                            </span>
                        ) : (
                            <span>Never</span>
                        )}
                    </Typography>
                </Box>
                <Box>
                    <ProjectsListCardActions {...props} />
                </Box>
            </Stack>
        </Card>
    )
}
