'use server'

import { Stack, Typography } from "@mui/material";
import AddProjectForm from "../../../../components/AddProjectForm";
import ProjectsList from "../../../../components/software-projects/ProjectsList";
import { listProjectsWithLatestScan } from "@/server/actions/projectActions";

export default async function ProjectsPage() {

    const projects = await listProjectsWithLatestScan();

    // console.log('PROJECTS:', JSON.stringify(projects));

    return (
        <section>
            <Stack alignItems='center' mb={6} direction='row' justifyContent='space-between'>
                <Typography variant='h4' mb={0}><strong>All Projects</strong></Typography>
                <AddProjectForm />
            </Stack>
            <ProjectsList projects={projects} />
        </section>
    )
}
