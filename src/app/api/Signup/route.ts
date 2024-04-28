
import { dbConnect } from "@/dbConfig/db";
import jwt,{Jwt, JwtPayload} from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import users from "@/models/User";
import { object } from "zod";




dbConnect();
export async function POST(req:Request, res:Response) {
    try {
        const form = await req.formData();
        const name = form.get("name") as string;
        const userName = form.get("username") as string;
        const email = form.get("emailid") as string;
        const password = form.get("password") as string;
        const avatar = form.get("img");
        

        const userExists = await users.findOne({emailid:email,username:userName});
        if(userExists){
            return NextResponse.json({error:"User already exists"},{status:400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const user = new users({
            name:name,
            username:userName,
            emailid:email,
            password:hashedPassword,
            avt:avatar,
        });
        const tokenData ={
            id:user._id,
            name:user.name,
        };
        await user.save();
        const token = jwt.sign(tokenData,process.env.SECRET_KEY!,{expiresIn:"7d"});
        const response = NextResponse.json({status:200});
        response.cookies.set("token",token,{
            httpOnly:true,
        });
        return response;

        
    } catch (error:any) {
        return NextResponse.json({error:error},{status:500});
    }
};

