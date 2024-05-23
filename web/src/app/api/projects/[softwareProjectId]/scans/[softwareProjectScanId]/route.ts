import { revalidatePath } from "next/cache";
import { DbConnection } from "../../../../../../server/database/db";
import { ProjectScanService } from "@/server/services/project-scan-service";

export async function PATCH(
    request: Request,
    { params }: { params: { softwareProjectId: string, softwareProjectScanId: string } }
) {

    const body = await request.json() as any;

    const softwareProjectScanId = Number(params.softwareProjectScanId);
    const tags = body.tags as string[];

    const connection = new DbConnection();

    try {
        await connection.open();

        const projectScanService = new ProjectScanService(connection);
        
        await projectScanService.recordProjectScanTags(softwareProjectScanId, tags);

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
