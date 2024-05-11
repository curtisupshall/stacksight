import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

import { ISoftwareProject } from "../../types/software-project";
import Typography, { TypographyProps } from "@mui/material/Typography";

interface IProjectScanStatusProps {
    project: ISoftwareProject
    TypographyProps?: Partial<TypographyProps>
}

export default function ProjectScanStatus(props: IProjectScanStatusProps) {
    // console.log('props:', props)
    let lastScanDispatchDay = null;
    let lastScanCompletionDay = null;
    let lastScanAbortedDay = null;

    let lastScanText = 'Never'
    let lastScanTooltip: string | undefined = undefined;

    if (props.project.last_scan_dispatched_at) {
        lastScanDispatchDay = dayjs(props.project.last_scan_dispatched_at);
        lastScanTooltip = lastScanDispatchDay.format('MMM D, YYYY h:mmA')
        lastScanText = `Started ${lastScanDispatchDay.fromNow()}`
    }

    if (props.project.last_scan_completed_at) {
        lastScanCompletionDay = dayjs(props.project.last_scan_completed_at)
        lastScanTooltip = lastScanCompletionDay.format('MMM D, YYYY h:mmA')
        lastScanText = `Completed ${lastScanCompletionDay.fromNow()}`;
    }

    if (props.project.last_scan_aborted_at) {
        lastScanAbortedDay = dayjs(props.project.last_scan_aborted_at)
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
