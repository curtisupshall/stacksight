import { ISoftwareOwner } from "@/types/software-owner";
import { getKnex, type DbConnection } from "../database/db";
import { BaseRepository } from "./base-repository";
import { Knex } from "knex";

export class SoftwareOwnerRepository extends BaseRepository {
    
    constructor(connection: DbConnection) {
        super(connection);
    }

    async listOwners(): Promise<ISoftwareOwner[]> {
        const query = getKnex()
            .queryBuilder()
            .select('owner_name')
            .count('* as num_projects')
            .from('software_project')
            .groupBy('owner_name');

        const response = await this.connection.knex(query);

        return response.rows;
    }
}
