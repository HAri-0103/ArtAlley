import posts from "@/models/UserPost";
import saved from "@/models/SavedSchema";
import { NextResponse } from "next/server";
import users from "@/models/User";
import { cookies } from "next/headers";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";

export async function GET(res:Request){
    try {
        const token = await cookies().get("token");
        const verify: JwtPayload | any = jwt.verify(token?.value||"", process.env.SECRET_KEY!);
        const po = await saved.find({userId: verify.id})
        return NextResponse.json({data: po},{status: 200})
        
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}