'use server'
// Server Action

import { revalidatePath } from "next/cache";
import { DbConnection } from "../../database/db";

export async function addNewProject(formData: FormData) {
    const repoFullName = formData.get('repoFullName');

    const response = await fetch(`https://api.github.com/repos/${repoFullName}`);
    const json = await response.json() as any;

    const connection = new DbConnection();

    try {
        await connection.open();
        await connection.query(
            `INSERT INTO software_project (
                owner_name,
                project_name,
                description,
                html_url
            ) VALUES ($1, $2, $3, $4)`,
            [
                json.owner.login,
                json.name,
                json.description,
                json.html_url
            ]
        );

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
    const softwareProjectId = formData.get('softwareProjectId');

    const connection = new DbConnection();

    try {
        await connection.open();
        await connection.query(
            `INSERT INTO software_project_scan (
                software_project_id
            ) VALUES ($1)`,
            [
                softwareProjectId
            ]
        );

        await connection.commit();

        revalidatePath('/projects');
    } catch (error) {
        connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}