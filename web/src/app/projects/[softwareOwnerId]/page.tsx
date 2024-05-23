'use server'

import { Box, Typography } from "@mui/material";
import { DbConnection } from "@/server/database/db";
import { SoftwareProjectService } from "@/server/services/software-project-service";

export default async function ProjectsPage() {
    const connection = new DbConnection();

    try {
        await connection.open();

        const softwareProjectService = new SoftwareProjectService(connection);

        await connection.commit();

        return (
            <section>
                <Typography variant='h4' mb={6}><strong>All Projects</strong></Typography>
                <Box mb={2}>
                </Box>
            </section>
        )
    } catch (error) {
        connection.rollback();
        throw error
    } finally {
        connection.release();
    }
}
