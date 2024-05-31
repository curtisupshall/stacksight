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

export async function scanOrganization(formData: FormData) {
    const softwareOrganizationIdFormValue = formData.get('softwareOrganizationId');

    if (!softwareOrganizationIdFormValue) {
        throw new Error('A software organization ID must be provided.')
    }

    const softwareOrganizationId = Number(softwareOrganizationIdFormValue);

    const connection = new DbConnection();

    try {
        // Open database connection
        await connection.open();
        
        const organizationService = new OrganizationService(connection);
        await organizationService.scanOrganizationById(softwareOrganizationId);

        // Commit the transaction
        await connection.commit();

        revalidatePath('/projects');
    } catch (error) {
        connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

// export async function deleteProject(formData: FormData) {
//     const softwareProjectIdFormValue = formData.get('softwareProjectId');

//     if (!softwareProjectIdFormValue) {
//         throw new Error('A software project ID must be provided.')
//     }

//     const softwareProjectId = Number(softwareProjectIdFormValue);

//     const connection = new DbConnection();

//     try {
//         // Open database connection
//         await connection.open();
        
//         const projectService = new SoftwareProjectService(connection);
//         await projectService.deleteProjectById(softwareProjectId);

//         // Commit the transaction
//         await connection.commit();

//         revalidatePath('/projects');
//     } catch (error) {
//         connection.rollback();
//         throw error;
//     } finally {
//         connection.release();
//     }
// }
