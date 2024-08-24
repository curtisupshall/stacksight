import { NextRequest } from "next/server";
import { SearchService } from "@/server/services/search-service";

export async function GET(
    request: NextRequest
) {
    const searchParams = request.nextUrl.searchParams
    const keyword: string = searchParams.get('q') ?? '';

    const results = await SearchService.searchByKeyword(keyword);

    return Response.json(results);
}
