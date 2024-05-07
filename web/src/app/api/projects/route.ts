import { DbConnection } from "../../../database/db";

export async function GET() {
    const connection = new DbConnection();

    try {
        await connection.open();

        const response = await connection.query(`SELECT * FROM software_project`);

        await connection.commit();

        return Response.json({ data: response.rows })
    } catch (error) {
        connection.rollback();
        throw error;
    } finally {
        connection.release()
    }
}
