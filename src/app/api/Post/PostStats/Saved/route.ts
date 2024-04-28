import { NextResponse } from "next/server";
import posts from "@/models/UserPost";
import saved from "@/models/SavedSchema";
import { cookies } from "next/headers";
import jwt,{ JwtPayload } from "jsonwebtoken";

export async function PUT(req:Request) {
    try {
        const data = await req.json();
        const token = await cookies().get("token");
        const verify: JwtPayload | any = jwt.verify(token?.value||"", process.env.SECRET_KEY!);
        const userData = await posts.findOne({ _id: data.id });
        const existLike = await saved.findOne({ postId:data.id , userId: userData.userId});
        console.log(existLike)
        if(existLike){
            await saved.deleteOne({ postId: data.id, userId: userData.userId });
            await posts.updateOne({ _id: data.id }, { $inc: { saved: -1 } });
            const length = await saved.find({ postId: data.id,userId:userData.userId }).countDocuments();
            console.log(length);
            return NextResponse.json({data:length},{ statusText: "unsaved" });
        }
        const newSaved = new saved({
            userId: verify.id,
            postId: data.id,
        });
        await newSaved.save();
        await posts.updateOne({ _id: data.id }, { $inc: { saved: +1 } });
        const length = await saved.find({ postId: data.id,userId:userData.userId }).countDocuments();
        return NextResponse.json({data:length},{ status: 200 });
           
        } catch (error: any) {
            return NextResponse.json({ error:error }, { status: 500 });
        } 
}

export async function GET(req:Request) {
    try {
        const userData = await saved.find();
        return NextResponse.json({data:userData}, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error:error }, { status: 500 });
    }
}