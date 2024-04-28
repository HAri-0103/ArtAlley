import { dbConnect } from "@/dbConfig/db";
import User from "@/models/User";
import jwt,{ JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

dbConnect();
export async function GET(req: Request) {
    try {
        const token = cookies().get('token');
        const verify: JwtPayload | any = jwt.verify(token?.value || "", process.env.SECRET_KEY!);
        const data = await User.findById(verify.id);
        return NextResponse.json({ data: data }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}