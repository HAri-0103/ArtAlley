import { NextResponse } from "next/server";

export async function GET(res:Request){
    try{
        const response = NextResponse.json({message:"Logged out successfully"},{status:200});
        response.cookies.delete('token');
        return response;

    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500});
    }
}