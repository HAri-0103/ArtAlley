import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    img:String,
    avt:String,
    name:String,
    username:String,
    caption:String,
    tag:String,
    likes:{
        type:Number,
        default:0,
        ref:"users",
    },
    likedBy:{
        type:[String],
        ref:"users",
        default:[],
    },
    saved:{
        type:Number,
        default:0,
        ref:"users",
    },
    savedBy:{
        type:[String],
        default:[],
        ref:"users",
    },
    userId:String,
}, {timestamps:true});

export default mongoose.models.posts || mongoose.model("posts", PostSchema);