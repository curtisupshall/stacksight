import { DbConnection, getKnex } from "../../../server/database/db";

export async function GET(
    request: Request,
) {

    const connection = new DbConnection();

    try {
        // await connection.open();

        // const qb = getKnex().queryBuilder().select('*').from('software_project');

        // const result = await connection.knex(qb);

        // connection.commit();

        return Response.json({ data: 'Healthy' });
    } catch (error) {
        connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}
