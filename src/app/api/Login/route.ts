import { dbConnect } from "@/dbConfig/db";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import { error } from "console";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

dbConnect();
export async function POST(request:Request){
    try {
        const form = await request.formData();
        const username = form.get("username") as string;
        const password = form.get("password") as string;

        const user = await User.findOne({username:username});

        if(!user) return NextResponse.json({error:"User not found"},{status:400});
        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword) return NextResponse.json({error:"Invalid password"},{status:400});

        const tokenData = {
            id:user._id,
            name:user.name,
        };
        const token = jwt.sign(tokenData,process.env.SECRET_KEY!,{expiresIn:"7d"});
        const response = NextResponse.json({success:"success"},{status:200});
        response.cookies.set("token",token,{
            httpOnly:true,
        });
        return response;
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}