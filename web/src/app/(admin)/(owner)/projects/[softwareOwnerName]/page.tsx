'use server'

import { Typography } from "@mui/material";
import { SoftwareProjectService } from "@/server/services/software-project-service";
import ProjectsList from "@/components/software-projects/ProjectsList";
import { notFound } from "next/navigation";

export default async function SoftwareOwnerPage({ params }: { params: { softwareOwnerName: string }}) {
    const { softwareOwnerName } = params;

    const projects = await SoftwareProjectService.listProjectsWithLatestScanByOwnerName(softwareOwnerName)

    if (!projects.length) {
        notFound();
    }

    return (
        <section>
            <Typography variant='h4' mb={6}><strong>{softwareOwnerName}</strong></Typography>
            <Typography variant='h6' mb={2}>Projects</Typography>
            <ProjectsList projects={projects} />
        </section>
    )
}
