import { DbConnection } from "../database/db";
import { BaseRepository } from "./base-repository";
import { ICreateSoftwareOrganizationRecord, ISoftwareOrganizationRecord } from "@/types/organization";

export class OrganizationRepository extends BaseRepository {
    
    constructor(connection: DbConnection) {
        super(connection);
    }

    async addOrganization(organization: ICreateSoftwareOrganizationRecord): Promise<ISoftwareOrganizationRecord> {
        const response = await this.connection.query(
            `
                INSERT INTO software_organization (
                    name,
                    full_name,
                    bio,
                    html_url,
                    avatar_url
                ) VALUES 
                (
                    $1, $2, $3, $4, $5
                )
                RETURNING *
            `,
            [
                organization.name,
                organization.full_name,
                organization.bio,
                organization.html_url,
                organization.avatar_url
            ]
        );

        return response.rows[0];
    }

    async listOrganizations(): Promise<ISoftwareOrganizationRecord[]> {
        const response = await this.connection.query(`
            SELECT *
            FROM software_organization
        `);

        return response.rows;
    }

    async getOrganizationById(softwareOrganizationId: number): Promise<ISoftwareOrganizationRecord | undefined> {
        const response = await this.connection.query(
            `
                SELECT *
                FROM software_organization
                WHERE software_organization_id = $1
            `,
            [softwareOrganizationId]
        );

        return response.rows[0];
    }
}
