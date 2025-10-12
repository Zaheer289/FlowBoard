import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
});

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["file","folder"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        default: null
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }],
    elements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Element"
    }],
    visibility: {
        type: String,
        enum: ["Public", "Private"],
        default: "Private"
    },
    tags: [{
        type: String
    }],
    likes: [{
        type: Number,
        default: 0
    }],
    views: [{
        type: Number,
        default: 0
    }],
    forkCount: {
        type: Number,
        default: 0
    },
    comments: [commentSchema],
}, {timestamps:true})

const Project = mongoose.model("Project", projectSchema);
export default Project;