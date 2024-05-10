'use client'

import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import { Box, Icon } from '@mui/material';
import type { SoftwareProjectStatus } from '../../types/software-project';
import { Cancel, Check, Help } from '@mui/icons-material';

interface IStatusIndicatorProps {
    status: SoftwareProjectStatus
}

export default function StatusIndicator(props: IStatusIndicatorProps) {
    switch (props.status) {
        case 'FAILED':
            return (
                <Cancel sx={{ width: '24px', height: '24px', m: '-4px' }}/>
            )

        case 'PENDING':
            return <LoadingSpinner />
        
        case 'SUCCEEDED':
            return (
                <Check color='success' sx={{ width: '24px', height: '24px', m: '-4px' }} />
            )

        default:
            return (
                <Help color='action' sx={{ width: '24px', height: '24px', m: '-4px' }} />
            )
    }
}

const LoadingSpinner = () => {
    return (
        <Box sx={{ position: 'relative', width: '16px', height: '16px' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: 'rgba(219, 171, 10, 0.5)'
                }}
                size={16}
                thickness={8}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: '#dbab0a',
                    animationDuration: '1000ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                        strokeDasharray: '30px, 200px'
                    },
                }}
                size={16}
                thickness={8}
            />
        </Box>
    )
}
