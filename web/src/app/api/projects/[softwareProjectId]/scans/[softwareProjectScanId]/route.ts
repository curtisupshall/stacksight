import { revalidatePath } from "next/cache";
import { DbConnection } from "../../../../../../server/database/db";
import { ProjectScanService } from "@/server/services/project-scan-service";
import { NextRequest } from "next/server";
import { IProjectScanLambdaResponse } from "@/types/python";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { softwareProjectId: string, softwareProjectScanId: string } }
) {

    const body = await request.json() as IProjectScanLambdaResponse;

    const softwareProjectScanId = Number(params.softwareProjectScanId);

    const connection = new DbConnection();

    try {
        await connection.open();

        const projectScanService = new ProjectScanService(connection);
        
        await projectScanService.patchProjectScan(softwareProjectScanId, body);

        revalidatePath('/projects');

        connection.commit();

        return Response.json({ data: 'Success' });
    } catch (error) {
        connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}
