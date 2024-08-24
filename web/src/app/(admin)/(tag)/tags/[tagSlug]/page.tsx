'use server'

import { Typography } from "@mui/material";
import { SoftwareProjectService } from "@/server/services/software-project-service";
import ProjectsList from "@/components/software-projects/ProjectsList";
import { notFound } from "next/navigation";
import { SOFTWARE_LIBRARIES } from "@/constants/libs";

export default async function SoftwareTagPage({ params }: { params: { tagSlug: string }}) {
    const { tagSlug } = params;

    const libraryDetails = SOFTWARE_LIBRARIES[tagSlug]

    if (!libraryDetails) {
        notFound();
    }

    const projects = await SoftwareProjectService.listProjectsWithLatestScanByTag(tagSlug)

    return (
        <section>
            <Typography variant='h4' mb={6}><strong>{libraryDetails.name}</strong></Typography>
            <Typography variant='h6' mb={2}>Projects</Typography>
            <ProjectsList projects={projects} />
        </section>
    )
}
