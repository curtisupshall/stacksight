import { revalidatePath } from "next/cache";
import { DbConnection } from "../../../../database/db";

export async function PATCH(request: Request) {

    const body = await request.json();
    console.log('body:', body)

    return Response.json({ data: 'Success' });

}
