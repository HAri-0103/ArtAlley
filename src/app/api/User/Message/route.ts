import chats from "@/models/ChatModel";
import { stat } from "fs";
import { NextResponse } from "next/server";

export async function GET(request:Request){
    const url = new URL(request.url);
    try {
        const id = url.searchParams.get("id");
        const mssgeData = await chats.find({receiverId: id});
        return NextResponse.json({data: mssgeData});
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function POST(request:Request){
    try {
        const data = await request.json();
        const cht = await new chats({
            senderId: data.senderId,
            receiverId: data.receiverId,
            message: data.message
        })
        const save = await cht.save();
        return NextResponse.json({status: "success",data:save});
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}