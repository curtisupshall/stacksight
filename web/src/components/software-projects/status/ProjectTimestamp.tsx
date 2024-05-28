import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

import { IProjectScan } from "@/types/project-scan";
import { Typography } from '@mui/material';

interface IProjectTimestampProps {
    scan: IProjectScan
}

export default function ProjectTimestamp(props: IProjectTimestampProps) {
    const { scan } = props;

    let lastScanDispatchDay = null;
    let lastScanCompletionDay = null;
    let lastScanAbortedDay = null;

    let lastScanText = 'Never'
    let lastScanTooltip: string | undefined = undefined;

    if (scan.dispatched_at) {
        lastScanDispatchDay = dayjs(scan.dispatched_at);
        lastScanTooltip = lastScanDispatchDay.format('MMM D, YYYY h:mmA')
        lastScanText = `Started ${lastScanDispatchDay.fromNow()}`
    }

    if (scan.completed_at) {
        lastScanCompletionDay = dayjs(scan.completed_at)
        lastScanTooltip = lastScanCompletionDay.format('MMM D, YYYY h:mmA')
        lastScanText = `Completed ${lastScanCompletionDay.fromNow()}`;
    }

    if (scan.aborted_at) {
        lastScanAbortedDay = dayjs(scan.aborted_at)
        lastScanTooltip = lastScanAbortedDay.format('MMM D, YYYY h:mmA')
        lastScanText = `Failed ${lastScanAbortedDay.fromNow()}`
    }

    return (
        <Typography variant='caption'>
            <span>Last scanned: </span>
            <span title={lastScanTooltip}>
                {lastScanText}
            </span>
        </Typography>
    );
}
