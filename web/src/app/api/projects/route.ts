import { revalidatePath } from "next/cache";
import { DbConnection } from "../../../database/db";

export async function GET() {
    const connection = new DbConnection();

    try {
        await connection.open();

        // const response = await connection.query(`
        //     SELECT
        //         sp.*,
        //         sps.dispatched_at AS last_scan_dispatched_at,
        //         sps.completed_at AS last_scan_completed_at
        //     FROM software_project sp
        //     LEFT JOIN software_project_scan sps
        //     ON sp.software_project_id = sps.software_project_id
        //     ORDER BY sp.created_at DESC
        // `);

        const response = await connection.query(`
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
        `);

        await connection.commit();

        return Response.json({ data: response.rows })
    } catch (error) {
        connection.rollback();
        throw error;
    } finally {
        connection.release()
    }
}
