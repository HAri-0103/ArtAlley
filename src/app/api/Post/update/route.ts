import { NextResponse } from "next/server";
import posts from '@/models/UserPost'

export async function GET(request:Request){

    const url = new URL(request.url);

    try {
        const id = url.searchParams.get("id");
        const updPst = await posts.findById(id);
        return NextResponse.json({data:{
            _id:updPst._id,
            caption:updPst.caption,
            tag:updPst.tag,
            imageUrl:updPst.img
        }}, {status: 200});
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function PUT(request:Request){
    try {
        const form = await request.formData();
        const id = form.get("id");
        const caption = form.get("caption");
        const tag = form.get("tag");
        let img = form.get("file");
        const updPst = await posts.findById(id);
        console.log(updPst);
        if(img===""){
            img = updPst.img;
        }
        updPst.caption = caption;
        updPst.tag = tag;
        updPst.img = img;
        await updPst.save();
        console.log(updPst);
        return NextResponse.json({message:"Post Updated"}, {status: 200});
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}