import type { DbConnection } from "../database/db";
import { BaseService } from "./base-service";


export class SoftwareProjectService extends BaseService {
    constructor(connection: DbConnection) {
        super(connection);
    }

    async listProjects() {
        const sqlQuery = `
            SELECT
                sp.*,
                sps.dispatched_at AS last_scan_dispatched_at,
                sps.completed_at AS last_scan_completed_at
            FROM software_project sp
            LEFT JOIN (
                SELECT
                    software_project_id,
                    MAX(dispatched_at) AS max_dispatched_at
                FROM software_project_scan
                GROUP BY software_project_id
            ) latest_sps ON sp.software_project_id = latest_sps.software_project_id
            LEFT JOIN software_project_scan sps ON sp.software_project_id = sps.software_project_id
                AND sps.dispatched_at = latest_sps.max_dispatched_at
            ORDER BY sp.created_at DESC
        `;

        const response = await this.connection.query(sqlQuery);

        return response.rows;
    }


}
