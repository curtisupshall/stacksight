'use client'



import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import { Box, Chip, SxProps } from '@mui/material';
import { getProjectStatus, getRelativeTime } from '@/utils/Utils';
import Link from 'next/link';
import { SoftwareProjectRecord, SoftwareProjectWithLatestScan } from '@/types/software-project';
import { ProjectScanRecordWithRelations } from '@/types/project-scan';

const StatusDot = (props: { color: string }) => {
    return (
        <Box
            sx={{
                width: '12px',
                height: '12px',
                ml: 1,
                borderRadius: '50%',
                backgroundColor: props.color
            }}
        />
    )
}

interface IProjectStatusIndicatorProps {
    scan: ProjectScanRecordWithRelations | null;
}

export default function ProjectStatusIndicator(props: IProjectStatusIndicatorProps) {
    const status = getProjectStatus(props.scan);

    let icon = <StatusDot color='action' />
    let label = 'Pending'
    let sxProps: SxProps = {}

    switch (status) {
        case 'FAILED':
            label = 'Failed'
            icon = (
                <StatusDot color='rgb(238, 0, 0)' />
            )
            break;

        case 'SCANNING':
            label='Scanning'
            sxProps = {
                backgroundColor: 'rgba(219, 171, 10, 0.1)',
                borderColor: '#dbab0a',
            }
            icon = (
                <Box ml={0}>
                <Box sx={{ position: 'relative', mx: 0.5, width: '12px', height: '12px' }}>
                    <CircularProgress
                        variant="determinate"
                        sx={{
                            display: 'block',
                            color: 'rgba(219, 171, 10, 0.5)',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                        }}
                        size={12}
                        thickness={10}
                        value={100}
                    />
                    <CircularProgress
                        variant="indeterminate"
                        disableShrink
                        sx={{
                            display: 'block',
                            color: '#dbab0a',
                            animationDuration: '1000ms',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            [`& .${circularProgressClasses.circle}`]: {
                                strokeLinecap: 'round',
                                strokeDasharray: '30px, 200px'
                            },
                        }}
                        size={12}
                        thickness={10}
                    />
                </Box>
                </Box>
            )
            break

        case 'SUCCEEDED':
            label = `Ready (${getRelativeTime(String(props.scan?.completedAt) ?? null)})`
            icon = (
                <StatusDot color='#50e3c2' />
            )
            break;

        default:
            break;
    }

    return (
        <Chip
            variant='outlined'
            icon={icon}
            label={label}
            sx={{
                ...sxProps,
                cursor: 'pointer'
            }}
        />
    )
}
