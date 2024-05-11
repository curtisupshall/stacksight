import { categorizeProjectTags } from "../../utils/Utils";


interface IProjectTechStackProps {
    tags: string[];
}

export default function ProjectTechStack(props: IProjectTechStackProps) {

    const categories = categorizeProjectTags(props.tags);

    return (
        <div />
    )
}
