'use server'

import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

import { Box, Card, Chip, Divider, IconButton, Stack, Typography } from "@mui/material";
import type { ISoftwareProject, SoftwareProjectStatus } from "../../types/software-project";
import Link from "next/link";
import ProjectsListCardActions from "./ProjectsListCardActions";
import { ForkRight, Print } from '@mui/icons-material';
import StatusDot from '../ui/StatusDot';
import StatusIndicator from '../ui/StatusIndicator';

export default async function ProjectsListCard(props: ISoftwareProject) {
    const repoFullName = `${props.owner_name}/${props.project_name}`;
    let lastScanDispatchDay = null;
    let lastScanCompletionDay = null;
    let lastScanAbortedDay = null;

    let status: SoftwareProjectStatus = 'UNKNOWN';
    let lastScanText = 'Never'
    let lastScanTooltip: string | undefined = undefined;

    if (props.last_scan_dispatched_at) {
        lastScanDispatchDay = dayjs(props.last_scan_dispatched_at);
        status = 'PENDING'
        lastScanTooltip = lastScanDispatchDay.format('MMM D, YYYY h:mmA')
        lastScanText = `Started ${lastScanDispatchDay.fromNow()}`
    }

    if (props.last_scan_completed_at) {
        lastScanCompletionDay = dayjs(props.last_scan_completed_at)
        status = 'SUCCEEDED'
        lastScanTooltip = lastScanCompletionDay.format('MMM D, YYYY h:mmA')
        lastScanText = `Completed ${lastScanCompletionDay.fromNow()}`;
    }

    if (props.last_scan_aborted_at) {
        lastScanAbortedDay = dayjs(props.last_scan_aborted_at)
        status = 'FAILED'
        lastScanTooltip = lastScanAbortedDay.format('MMM D, YYYY h:mmA')
        lastScanText = `Failed ${lastScanAbortedDay.fromNow()}`
    }

    return (
        <Card component='li' key={props.software_project_id} sx={{ p: 2 }}>
            <Stack direction='row' gap={1}>
                <Box flex={2}>
                    <Stack direction='row' gap={1.5} alignItems='center'>
                        <Link target="_blank" href={props.html_url}>
                            <Typography variant='h6'>{repoFullName}</Typography>
                        </Link>
                        <StatusIndicator status={status} />
                        <Chip icon={<ForkRight />} label={props.branch_name} />
                    </Stack>
                    <Typography variant='body2'>{props.description}</Typography>
                    <Typography variant='caption'>
                        <span>Last scanned: </span>
                        <span title={lastScanTooltip}>
                            {lastScanText}
                        </span>
                    </Typography>
                </Box>
                {/* <Divider orientation='vertical' /> */}
                <Stack direction='row' gap={1} flex={3} pt={0.5}>
                    {props.tags.filter(Boolean).map((tag) => (
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
