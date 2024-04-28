import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userId:String,
  postId:String,
  });
  
  export default mongoose.models.likes || mongoose.model('likes', userSchema);