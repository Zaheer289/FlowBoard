import Project from "../models/Project.js";
import User from "../models/User.js";
import Element from "../models/Element.js";
import mongoose from 'mongoose';
export const createProject = async (req, res) => {
    const payload = { ...req.body, owner: req.user.id || req.user._id };
    delete payload.template;
    try {
        const newProject = new Project(payload);
        await newProject.save();
        await User.findByIdAndUpdate(payload.owner, {
            $push: { projects: newProject._id },
        });
        return res.status(201).json({ message: "Data saved successfully", body: newProject });
    }
    catch (err) {
        return res.status(500).json({ message: "Error saving data" });
    }

}

export const saveProject = async (req, res) => {
    const projectId = req.params.id;
    const { elements } = req.body;
    try {
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });
        if (project.owner.toString() !== (req.user.id || req.user._id).toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Delete all old elements
        await Element.deleteMany({ project: projectId });

        // Insert new elements
        const newElements = elements.map(el => ({
            ...el,
            project: projectId,
            createdBy: req.user.id || req.user._id
        }));
        
        let insertedElements = [];
        if (newElements.length > 0) {
            insertedElements = await Element.insertMany(newElements);
        }

        // Update Project
        project.content = insertedElements.map(el => el._id);
        await project.save();

        res.status(200).json({ message: "Project saved successfully", data: project });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error saving project" });
    }
}

export const deleteProject = async (req, res) => {
    const projectId = req.params.id; // Usually read from req.params.id based on routes
    try {
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });
        if (project.owner.toString() !== (req.user.id || req.user._id).toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await Element.deleteMany({ project: projectId });
        await Project.findByIdAndDelete(projectId);
        await User.findByIdAndUpdate(req.user.id || req.user._id, {
            $pull: { projects: projectId },
        });
        return res.status(200).json({ message: "Data deleted successfully" });
    }
    catch (err) {
        return res.status(500).json({ message: "Error deleting data" });
    }
}

export const getProjects = async (req, res) => {
    const userId = req.user.id || req.user._id;

    const { archived, starred } = req.query;
    let query = { owner: new mongoose.Types.ObjectId(userId) }

    const projects = await Project.find(query).sort({ updatedAt: -1 });

    res.status(200).json({ message: "Data retrieved successfully!", data: projects });

}

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('content');
        if (!project) return res.status(404).json({ message: "Project not found" });
        // Optional: Ensure the user requesting this is the owner
        if (project.owner.toString() !== (req.user.id || req.user._id).toString()) {
            return res.status(403).json({ message: "Unauthorized access to this project" });
        }
        res.status(200).json({ message: "Data retrieved successfully!", data: project });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving project" });
    }
};