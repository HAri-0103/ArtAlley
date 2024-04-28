import mongoose from 'mongoose';

export async function dbConnect() {
try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const conn = mongoose.connection;
    conn.on("connected",()=>{
        return Response.json({status:200});
    });
    conn.on("error",(err)=>{
        return Response.json({err},{status:500});
    });
} catch (error) {
    return Response.json({error},{status:500});
}
}