'use server'

import { revalidatePath } from "next/cache";
import { DbConnection } from "../database/db";
import { OrganizationService } from "../services/organization-service";

export async function addNewOrganization(formData: FormData) {
    const orgName = formData.get('orgName');

    if (!orgName) {
        throw new Error('No org name was given.')
    }

    const connection = new DbConnection();

    try {
        await connection.open();

        const softwareOrganizationService = new OrganizationService(connection);

        await softwareOrganizationService.addOrganizationByName(String(orgName));

        await connection.commit();

        revalidatePath('/orgs');
    } catch (error) {
        connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}
