'use server'

import { Typography } from "@mui/material";
import { DbConnection } from "../../../../../../../server/database/db";
import { SoftwareProjectService } from "../../../../../../../server/services/software-project-service";
import { notFound } from "next/navigation";
import { ProjectScanService } from "@/server/services/project-scan-service";
import ProjectScansList from "@/components/project-scans/ProjectScansList";

export default async function SoftwareProjectPage({ params }: { params: { softwareProjectName: string, softwareOwnerName: string }}) {
    
    const { softwareProjectName, softwareOwnerName } = params;
    const repoFullName = [softwareOwnerName, softwareProjectName].join('/')

    const connection = new DbConnection();

    try {
        await connection.open();

        const softwareProjectService = new SoftwareProjectService(connection);
        const project = await softwareProjectService.getProjectByFullName(repoFullName);

        if (!project) {
            return notFound();
        }

        const projectScanService = new ProjectScanService(connection);
        const scans = await projectScanService.listScansByProjectId(project.software_project_id);

        await connection.commit();

        return (
            <section>
                <Typography variant='h4' mb={6}><strong>{repoFullName}</strong></Typography>
                <Typography variant='h6' mb={2}>Scans</Typography>
                <ProjectScansList scans={scans} />
            </section>
        )
    } catch (error) {
        connection.rollback();
        throw error
    } finally {
        connection.release();
    }
}
