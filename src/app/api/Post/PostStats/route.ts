import { dbConnect } from "@/dbConfig/db";
import { NextResponse } from "next/server";
import posts from "@/models/UserPost";
import likes from "@/models/LikeSchema";
import saved from "@/models/SavedSchema";



dbConnect()
export async function POST(req:Request) {
    try {
        const data = await req.json();
        const userData = await posts.findOne({ _id: data.id });
        const existLike = await likes.findOne({ postId:data.id , userId: userData.userId});
        if(existLike){
            await likes.deleteOne({ postId: data.id, userId: userData.userId });
            await posts.updateOne({ _id: data.id }, { $inc: { likes: -1 } });
            const length = await likes.find({ postId: data.id,userId:userData.userId }).countDocuments();
            return NextResponse.json({data:length},{ statusText: "unliked"});
        }
        const newLike = new likes({
            userId: userData.userId,
            postId: data.id,
        });
        await newLike.save();
        await posts.updateOne({ _id: data.id }, { $inc: { likes: +1 } });
        const length = await likes.find({ postId: data.id,userId:userData.userId }).countDocuments();
        return NextResponse.json({data:length},{ status: 200 });
           
        } catch (error: any) {
            return NextResponse.json({ error:error }, { status: 500 });
        } 
}


export async function GET(req:Request) {
    try {
        const userData = await likes.find();
        return NextResponse.json({data:userData}, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error:error }, { status: 500 });
    }
}

export async function PUT(req:Request) {
    try {
        const data = await req.json();
        const likeLength = await posts.findOne({ _id: data.id })
        const length = {
            likes: likeLength.likes,
            saved: likeLength.saved
        }
        return NextResponse.json({data:length},{ status: 200 });
    } catch (error) {
        return NextResponse.json({ error:error }, { status: 500 });
    }
}