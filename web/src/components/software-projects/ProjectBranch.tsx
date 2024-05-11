import { ForkRight } from "@mui/icons-material";
import { ISoftwareProject } from "../../types/software-project";
import { Chip } from "@mui/material";


export default function ProjectBranch(props: ISoftwareProject) {
    return (
        <Chip icon={<ForkRight />} label={props.branch_name} />
    )
}