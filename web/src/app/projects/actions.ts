'use server'

import { SQS } from 'aws-sdk';
import { revalidatePath } from "next/cache";
import { DbConnection } from "../../database/db";
import type { ISoftwareProject } from '../../types/software-project';

export async function addNewProject(formData: FormData) {
    const repoFullName = formData.get('repoFullName');

    const response = await fetch(`https://api.github.com/repos/${repoFullName}`);
    const json = await response.json() as any;

    const connection = new DbConnection();

    try {
        await connection.open();

        // Check if the project is already added.

        const response = await connection.query(
            `SELECT COUNT(*) as project_count FROM software_project WHERE full_name ILIKE $1`,
            [repoFullName]
        )

        if (response.rows[0].project_count > 0) {
            throw new Error('Project has already been added.')
        }

        await connection.query(
            `INSERT INTO software_project (
                full_name,
                owner_name,
                project_name,
                description,
                html_url
            ) VALUES ($1, $2, $3, $4, $5)`,
            [
                json.full_name,
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
        // Open database connection
        await connection.open();

        // Fetch data about the project
        const response = await connection.query(
            `SELECT * FROM software_project WHERE software_project_id = $1`, 
            [softwareProjectId]
        );

        const softwareProject: ISoftwareProject = response.rows[0];
        if (!softwareProject) {
            throw new Error(`Failed to find project with ID: ${softwareProjectId}`)
        }

        // Persist the dispatched scan in the database
        await connection.open();
        await connection.query(
            `INSERT INTO software_project_scan (
                software_project_id
            ) VALUES ($1)`,
            [
                softwareProjectId
            ]
        );

        const sqsConfig = {
            region: process.env.AWS_SQS_REGION,
            endpoint: process.env.AWS_SQS_ENDPOINT,
            accessKeyId: 'na',
            secretAccessKey: 'na', // Deprecated?
        }

        console.log('sqs config:', sqsConfig)

        // Add the scan to the repo scan queue
        const sqs = new SQS(sqsConfig);

        if (!process.env.AWS_REPO_SCAN_QUEUE_URL) {
            throw new Error('Could not find AWS_REPO_SCAN_QUEUE_URL')
        }
        
        const messageParams = {
            MessageBody: `${softwareProject.owner_name}/${softwareProject.project_name}`,
            QueueUrl: process.env.AWS_REPO_SCAN_QUEUE_URL
        }

        sqs.sendMessage(messageParams, (error, data) => {
            if (error) {
                throw error;
            }

            console.log(data);
        })

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