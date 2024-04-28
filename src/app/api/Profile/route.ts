import { dbConnect } from "@/dbConfig/db";
import jwt,{ JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse} from "next/server";
import User from "@/models/User";
import LikeSchema from "@/models/LikeSchema";


dbConnect();
export async function GET(req:NextRequest){
    try{
        const cookie = req.cookies.get("token");
        const verifyToken: JwtPayload | any = jwt.verify(cookie?.value || "", process.env.SECRET_KEY!);
        const user = await User.findOne({ _id: verifyToken.id});
        return NextResponse.json({ name:user.name, username:user.username, avt:user.avt }, { status: 200 });

    } catch(err:any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}