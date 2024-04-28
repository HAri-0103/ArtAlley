import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  postId:String,
  userId:String,
  });
  
  export default mongoose.models.saved || mongoose.model('saved', userSchema);