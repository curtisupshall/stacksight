import db from "@/database/client";
import { Project } from "@/database/schemas";
import { ISoftwareOwner } from "@/types/software-owner";
import { like, sql } from "drizzle-orm";

export class SoftwareOwnerRepository {
    
    // async listOwners(): Promise<ISoftwareOwner[]> {
    //     const query = getKnex()
    //         .queryBuilder()
    //         .select('owner_name')
    //         .count('* as num_projects')
    //         .from('software_project')
    //         .groupBy('owner_name');

    //     const response = await this.connection.knex(query);

    //     return response.rows;
    // }

    static async searchOwnersByName(ownerName: string): Promise<ISoftwareOwner[]> {
        const rows = await db
            .select({
                ownerName: Project.ownerName,
                numProjects: sql<number>`cast(count(${Project.softwareProjectId}) as int)`,
            })
            .from(Project)
            .where(like(Project.ownerName, `%${ownerName}%`))
            .groupBy(Project.ownerName)
        
        return rows;
    }
}
