'use server'

import { revalidatePath } from "next/cache";
import { DbConnection } from "../database/db";
import { SoftwareProjectService } from '../services/software-project-service';
import { ProjectScanService } from "../services/project-scan-service";

export async function addNewProject(formData: FormData) {
    const repoFullNameWithBranchFormValue = formData.get('repoFullName');

    if (!repoFullNameWithBranchFormValue) {
        throw new Error('No repo name was given.')
    }

    const connection = new DbConnection();

    try {
        await connection.open();
        
        const softwareProjectService = new SoftwareProjectService(connection);
        
        const [repoFullName, branchName] = String(repoFullNameWithBranchFormValue).split('@');

        if (!repoFullName) {
            throw new Error('A repo name is required.')
        }

        await softwareProjectService.addNewProject(repoFullName, branchName);

        await connection.commit();

        revalidatePath('/projects');
    } catch (error) {
        connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

export async function scanProject(formData: FormData) {
    const softwareProjectIdFormValue = formData.get('softwareProjectId');

    if (!softwareProjectIdFormValue) {
        throw new Error('A software project ID must be provided.')
    }

    const softwareProjectId = Number(softwareProjectIdFormValue);

    const connection = new DbConnection();

    try {
        // Open database connection
        await connection.open();
        
        const projectScanService = new ProjectScanService(connection);
        await projectScanService.scanProjectById(softwareProjectId);

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