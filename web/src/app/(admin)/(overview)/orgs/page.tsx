'use server'

import { Stack, Typography } from "@mui/material";
import AddOrganizationForm from "@/components/AddOrganizationForm";
import OrganizationsList from "@/components/organizations/OrganizationsList";
import { ISoftwareOrganizationRecord } from "@/types/organization";

export default async function OrganizationsPage() {
    // const orgs = await SoftwareOrganizationService.listOrganizations();
    const orgs: ISoftwareOrganizationRecord[] = [];

    return (
        <section>
            <Stack alignItems='center' mb={6} direction='row' justifyContent='space-between'>
                <Typography variant='h4' mb={0}><strong>All Organizations</strong></Typography>
                <AddOrganizationForm />
            </Stack>
            <OrganizationsList orgs={orgs} />
        </section>
    )
}
