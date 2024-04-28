import { dbConnect } from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import posts from "@/models/UserPost";
import { all } from "axios";

dbConnect();
export async function GET(request:NextRequest){
    try {
        const allPosts = await posts.find();
        return NextResponse.json({data: allPosts }, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}