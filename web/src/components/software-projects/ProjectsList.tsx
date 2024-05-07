import { Stack } from "@mui/material";
import type { ISoftwareProject } from "../../types/software-project";
import ProjectsListCard from "./ProjectsListCard";

interface IProjectsListProps {
    projects: ISoftwareProject[];
}

export default function ProjectsList(props: IProjectsListProps) {
    return (
        <Stack component='ul' gap={2}>
            {props.projects.map((project) => {
                return (
                    <ProjectsListCard {...project} />
                )
            })}
        </Stack>
)
}