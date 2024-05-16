import { revalidatePath } from "next/cache";
import { DbConnection } from "../../../../../../server/database/db";
import { SoftwareProjectService } from "../../../../../../server/services/software-project-service";

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

        const softwareProjectService = new SoftwareProjectService(connection);
        
        await softwareProjectService.recordProjectScanTags(softwareProjectScanId, tags);

        connection.commit();

        return Response.json({ data: 'Success' });
    } catch (error) {
        connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}
