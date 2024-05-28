

import { ISoftwareProject } from "../../../types/software-project";
import Typography from "@mui/material/Typography";
import { IProjectScan } from '@/types/project-scan';
import { getProjectStatus } from '@/utils/Utils';
import { Stack } from "@mui/material";
import ProjectBranch from "./ProjectBranch";
import ProjectStatusIndicator from "./ProjectStatusIndicator";

type IProjectStatusSlot =
    | 'SCAN_TIMESTAMP'
    | 'SCAN_INDICATOR'
    | 'BRANCH_NAME'
    | 'COMMIT_HASH'
    | 'COMMIT_MESSAGE'

interface IProjectStatusProps {
    project: ISoftwareProject
    slots?: Partial<Record<IProjectStatusSlot, boolean>>
}

const DEFAULT_SLOTS: Partial<Record<IProjectStatusSlot, boolean>> = {
    'SCAN_INDICATOR': true,
    'BRANCH_NAME': true,
}

// export default function ProjectStatus(props: IProjectStatusProps) {
//     const slots = props.slots ?? DEFAULT_SLOTS;

    

//     return (
//         <Stack gap={1}>
//             {slots.BRANCH_NAME && (
//                 <ProjectBranch {...props.project} />
//             )}

//             {slots.COMMIT_HASH && (
//                 <Typography>Commit hash</Typography>
//             )}

//             {slots.COMMIT_MESSAGE && (
//                 <Typography>Commit message</Typography>
//             )}

//             {/* {slots.SCAN_INDICATOR && (
//                 <ProjectStatusIndicator scan={props.project.last_scan} />
//             )} */}

//             {slots.SCAN_TIMESTAMP && (
//                 <ProjectTimestamp scan={props.project.last_scan} />
//             )}
//         </Stack>
//     );
// }
