'use server'

import { List, ListItem, Typography } from "@mui/material";
import { PrismaClient } from "@prisma/client"

export default async function ProjectsPage() {
    const prisma = new PrismaClient();
      
    let projects = [];

    try {
        projects = await prisma.softwareprojects.findMany()
        await prisma.$disconnect()
    } catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect()
    }

    return (
        <div>
            <Typography variant='h1'>My Projects</Typography>
            <List>
                {projects.map((project: any) => {
                    return (
                        <ListItem>{JSON.stringify(project)}</ListItem>
                    )
                })}
            </List>
        </div>
    )
}
