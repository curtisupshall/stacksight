import { Box, Stack } from "@mui/material";
import SignInButton from "../auth/SignInButton"
import SignOutButton from "../auth/SignOutButton"
import UserAvatar from "../auth/UserAvatar";
import { ProjectScanRecordWithRelations } from "@/types/project-scan";
import ProjectScansListCard from "./ProjectScansListCard";

interface IProjectScansListProps {
    scans: ProjectScanRecordWithRelations[]
}

export default function ProjectScansList(props: IProjectScansListProps) {
    return (
        <Box>
            <Stack component='ul' gap={2} sx={{ p: 0, m: 0 }}>
                {props.scans.map((scan) => {
                    return (
                        <ProjectScansListCard key={scan.softwareProjectScanId} scan={scan} />
                    )
                })}
            </Stack>
        </Box>
    )
}
