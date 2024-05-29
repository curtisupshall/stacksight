import { ForkRight } from "@mui/icons-material";
import { ISoftwareProject } from "../../../types/software-project";
import { Chip, Typography } from "@mui/material";
import { IProjectScanRecord } from "@/types/project-scan";
import { getRelativeTime } from "@/utils/Utils";

export default function ProjectCommitHash(props: IProjectScanRecord) {
    const hash = props.commit_sha.slice(0, 7);

    return (
        <Chip
            variant='outlined'
            icon={
                <svg data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" color="currentcolor"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5ZM8 12C9.95279 12 11.5787 10.6006 11.9298 8.75H15.25H16V7.25H15.25H11.9298C11.5787 5.39935 9.95279 4 8 4C6.04721 4 4.42125 5.39935 4.0702 7.25H0.75H0V8.75H0.75H4.0702C4.42125 10.6006 6.04721 12 8 12Z" fill="currentColor"></path></svg>
            }
            label={
                <>
                    <Typography variant='inherit' component='span' sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                        {hash}
                    </Typography>
                    <Typography variant='inherit' component='span'>
                        &nbsp;({getRelativeTime(props.commit_date)})
                    </Typography>
                </>    
            }
            sx={{
                cursor: 'pointer'
            }}
            // size='small'
            component='a'
            href={props.commit_html_url}
            target='_blank'
        />
    )
}
