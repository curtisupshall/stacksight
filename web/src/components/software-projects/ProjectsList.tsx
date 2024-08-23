import { Box, Stack } from "@mui/material";
import type { SoftwareProjectWithLatestScan } from "@/types/software-project";
import ProjectsListCard from "./ProjectsListCard";
import SignInButton from "../auth/SignInButton"
import SignOutButton from "../auth/SignOutButton"
import UserAvatar from "../auth/UserAvatar";

interface IProjectsListProps {
    projects: SoftwareProjectWithLatestScan[];
}

export default function ProjectsList(props: IProjectsListProps) {
    return (
        <Box>
            <Stack component='ul' gap={2} sx={{ p: 0, m: 0 }}>
                {props.projects.map((project) => {
                    return (
                        <ProjectsListCard key={project.softwareProjectId} {...project} />
                    )
                })}
            </Stack>
        </Box>
    )
}
