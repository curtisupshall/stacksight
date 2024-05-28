import { Box, Stack } from "@mui/material";
import SignInButton from "../auth/SignInButton"
import SignOutButton from "../auth/SignOutButton"
import UserAvatar from "../auth/UserAvatar";
import { IProjectScanRecord } from "@/types/project-scan";
import ProjectScansListCard from "./ProjectScansListCard";

interface IProjectScansListProps {
    scans: IProjectScanRecord[]
}

export default function ProjectScansList(props: IProjectScansListProps) {
    return (
        <Box>
            <Stack component='ul' gap={2} sx={{ p: 0, m: 0 }}>
                {props.scans.map((scan) => {
                    return (
                        <ProjectScansListCard key={scan.software_project_scan_id} {...scan} />
                    )
                })}
            </Stack>
        </Box>
    )
}
