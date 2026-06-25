import mongoose from "mongoose"

const elementSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true},
    type: {
        type: String,
        enum: ["rectangle", "ellipse", "circle", "triangle", "hexagon", "arrow", "line", "text", "image", "graph", "table"],
        required: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

const Element = mongoose.model("Element", elementSchema);
export default Element;