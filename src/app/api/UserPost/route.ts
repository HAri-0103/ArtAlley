import posts from "@/models/UserPost"
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request:Request){
    const url = new URL(request.url);
    try {
        const username = url.searchParams.get("username");
        const user = await posts.find({username:username});
        return NextResponse.json({data:user}, {status: 200});
        } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}