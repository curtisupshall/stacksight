import { revalidatePath } from "next/cache";
import { ProjectScanService } from "@/server/services/project-scan-service";
import { NextRequest } from "next/server";
import { IProjectScanLambdaResponse } from "@/types/python";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { softwareProjectId: string, softwareProjectScanId: string } }
) {

    const body = await request.json() as IProjectScanLambdaResponse;

    const softwareProjectScanId = Number(params.softwareProjectScanId);

    await ProjectScanService.patchProjectScan(softwareProjectScanId, body);

    revalidatePath('/projects');

    return Response.json({ data: 'Success' });
}
