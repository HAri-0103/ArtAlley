import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Name is required"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username should be unique"]
    },
    emailid: {
        type: String,
        required: [true, "EmailId is required"],
        unique: [true, "EmailId should be unique"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    avt: {
        type: String,
        required:  [true, "Avatar is required"]
    },
    savedPost:{
        type: [String],
        default: []
    },
}, {timestamps:true});
export default mongoose.models.users || mongoose.model("users", UserSchema);