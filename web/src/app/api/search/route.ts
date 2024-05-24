import { revalidatePath } from "next/cache";
import { ProjectScanService } from "@/server/services/project-scan-service";
import { NextRequest } from "next/server";
import { DbConnection } from "@/server/database/db";
import { SearchService } from "@/server/services/search-service";

export async function GET(
    request: NextRequest
) {
    const searchParams = request.nextUrl.searchParams
    const keyword: string = searchParams.get('q') ?? '';

    const connection = new DbConnection();

    try {
        await connection.open();

        const searchService = new SearchService(connection);

        const results = await searchService.searchByKeyword(keyword);

        connection.commit();

        return Response.json(results);
    } catch (error) {
        connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}
