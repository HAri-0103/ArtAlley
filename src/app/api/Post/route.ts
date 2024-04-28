import { dbConnect } from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "@/models/User";
import posts from "@/models/UserPost";
import { cookies } from "next/headers";




dbConnect();
export async function POST(request:Request){
    try {
        const data = await request.formData();
        const img = data.get("file");
        const caption = data.get("caption") as string;
        const tags = data.get("tags") as string;

        console.log("fine")
        const token = cookies().get("token");
        if(!token){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const verified:JwtPayload|any = jwt.verify(token?.value,process.env.SECRET_KEY!);
        const whoUser = await User.findById(verified.id);
        if(!whoUser){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const post = new posts({
            userId:whoUser._id,
            avt:whoUser.avt,
            name:whoUser.name,
            username:whoUser.username,
            img:img,
            caption:caption,
            tag:tags,
            likes:0,
            saved:0,
        });
        await post.save();
        return NextResponse.json({message: "Post created successfully!"}, {status: 200});
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function GET(request:Request){
    const url = new URL(request.url);
    try {
        const username = url.searchParams.get("username");
        const user = await User.findOne({username:username});
        const token = cookies().get("token");
        const verify: JwtPayload | any = jwt.verify(token?.value||"", process.env.SECRET_KEY!);
        if(user.id!==verify.id){
            return NextResponse.json({id:user._id,avt:user.avt,name:user.name,username:user.username}, {status: 201});
        }
        return NextResponse.json({id:user._id,avt:user.avt,name:user.name,username:user.username}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function PUT(request:Request){
    try {
        const data = await request.json();
        const id = data.id;
        const token = cookies().get("token");
        const verify: JwtPayload | any = jwt.verify(token?.value||"", process.env.SECRET_KEY!);
        const userPost = await posts.findById(id);
        if(userPost.userId===verify.id){
            await posts.findByIdAndDelete(id);
            return NextResponse.json({message: "Post deleted successfully!"}, {status: 200});
        }
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}