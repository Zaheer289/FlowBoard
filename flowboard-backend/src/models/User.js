import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required:true},
    profilePicture: {type:String},
    projects:[{type: mongoose.Schema.Types.ObjectId, ref:"Project"}],
    sharedProjects:[{type: mongoose.Schema.Types.ObjectId, ref:"Project"}],
    likedProjects:[{type: mongoose.Schema.Types.ObjectId, ref:"Project"}],
    savedProjects:[{type: mongoose.Schema.Types.ObjectId, ref:"Project"}],
},{timestamps: true});

const User = mongoose.model("User",userSchema);
export default User