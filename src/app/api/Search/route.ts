import { dbConnect } from "@/dbConfig/db";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import posts from "@/models/UserPost";


dbConnect();
export async function PUT(req:Request){
    try {
        const search = await req.json();
        const allPosts = await posts.find({caption:{$regex:search.search, $options:"i"}});
        
    return NextResponse.json({data: allPosts}, {status: 200});
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}