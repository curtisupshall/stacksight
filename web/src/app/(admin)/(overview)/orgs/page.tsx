'use server'

import { Stack, Typography } from "@mui/material";
import { DbConnection } from "@/server/database/db";
import { OrganizationService } from "@/server/services/organization-service";
import AddOrganizationForm from "@/components/AddOrganizationForm";
import OrganizationsList from "@/components/organizations/OrganizationsList";

export default async function OrganizationsPage() {
    const connection = new DbConnection();

    try {
        await connection.open();

        const softwareOrganizationService = new OrganizationService(connection);
        const orgs = await softwareOrganizationService.listOrganizations();

        await connection.commit();

        return (
            <section>
                <Stack alignItems='center' mb={6} direction='row' justifyContent='space-between'>
                    <Typography variant='h4' mb={0}><strong>All Organizations</strong></Typography>
                    <AddOrganizationForm />
                </Stack>
                <OrganizationsList orgs={orgs} />
            </section>
        )
    } catch (error) {
        connection.rollback();
        throw error
    } finally {
        connection.release();
    }
}
