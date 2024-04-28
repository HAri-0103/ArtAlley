import { dbConnect } from "@/dbConfig/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

dbConnect();
export async function GET(request:Request){

    const url = new URL(request.url);

    try {
        const id = url.searchParams.get("id");
        console.log(id);
        const updPst = await User.findById(id);
        return NextResponse.json({data: updPst});
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
