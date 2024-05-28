'use client'

import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import { Box, Icon } from '@mui/material';
import { Cancel, Check, Help } from '@mui/icons-material';
import { SoftwareProjectStatus } from '@/types/software-project';
import { IProjectScan } from '@/types/project-scan';
import { getProjectStatus } from '@/utils/Utils';

interface IStatusIndicatorProps {
    scan: IProjectScan;
}

export default function ProjectStatusIndicator(props: IStatusIndicatorProps) {
    const status = getProjectStatus(props.scan);

    switch (status) {
        case 'FAILED':
            return (
                <Cancel sx={{ width: '24px', height: '24px', m: '-4px' }}/>
            )

        case 'PENDING':
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
