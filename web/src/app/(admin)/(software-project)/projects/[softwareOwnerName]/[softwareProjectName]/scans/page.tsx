'use server'

import { Typography } from "@mui/material";
import { SoftwareProjectService } from "@/server/services/software-project-service";
import { notFound } from "next/navigation";
import { ProjectScanService } from "@/server/services/project-scan-service";
import ProjectScansList from "@/components/project-scans/ProjectScansList";

export default async function SoftwareProjectPage({ params }: { params: { softwareProjectName: string, softwareOwnerName: string }}) {    
    const { softwareProjectName, softwareOwnerName } = params;
    const repoFullName = [softwareOwnerName, softwareProjectName].join('/')

    const project = await SoftwareProjectService.getProjectByFullName(repoFullName);

    if (!project) {
        return notFound();
    }

    const scans = await ProjectScanService.listScansWithRelationsByProjectId(project.softwareProjectId);

    return (
        <section>
            <Typography variant='h4' mb={6}><strong>{repoFullName}</strong></Typography>
            <Typography variant='h6' mb={2}>Scans</Typography>
            <ProjectScansList scans={scans} />
        </section>
    )
}
