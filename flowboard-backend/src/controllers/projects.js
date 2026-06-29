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

export const updateProject = async (req, res) => {
    const projectId = req.params.id;
    const { name, visibility, description, tags, collaborators } = req.body;
    try {
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });
        if (project.owner.toString() !== (req.user.id || req.user._id).toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (name !== undefined) project.name = name;
        if (visibility !== undefined) project.visibility = visibility;
        if (description !== undefined) project.description = description;
        if (tags !== undefined) project.tags = tags;
        if (collaborators !== undefined) project.collaborators = collaborators;

        await project.save();

        res.status(200).json({ message: "Project updated successfully", data: project });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating project" });
    }
}

export const getProjects = async (req, res) => {
    const userId = req.user.id || req.user._id;

    const { archived, starred } = req.query;
    let query = { 
        $or: [
            { owner: new mongoose.Types.ObjectId(userId) },
            { collaborators: new mongoose.Types.ObjectId(userId) }
        ]
    };

    const projects = await Project.find(query).populate('collaborators', '_id username name').sort({ updatedAt: -1 });

    res.status(200).json({ message: "Data retrieved successfully!", data: projects });

}

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('content')
            .populate('collaborators', '_id username name');
            
        if (!project) return res.status(404).json({ message: "Project not found" });
        
        // Check authorization: Is the user the owner OR a collaborator?
        const isOwner = project.owner.toString() === (req.user.id || req.user._id).toString();
        const isCollaborator = project.collaborators.some(
            c => c._id.toString() === (req.user.id || req.user._id).toString()
        );

        if (!isOwner && !isCollaborator) {
            return res.status(403).json({ message: "Not authorized to view this project" });
        }
        
        res.status(200).json({ message: "Data retrieved successfully!", data: project });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving project" });
    }
};

export const inviteCollaborator = async (req, res) => {
    try {
        const projectId = req.params.id;
        const { email } = req.body;

        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        // Only owner can invite
        if (project.owner.toString() !== (req.user.id || req.user._id).toString()) {
            return res.status(403).json({ message: "Only the owner can invite collaborators" });
        }

        const userToInvite = await User.findOne({ email });
        if (!userToInvite) return res.status(404).json({ message: "User not found" });

        // Check if already a collaborator
        if (project.collaborators.includes(userToInvite._id)) {
            return res.status(400).json({ message: "User is already a collaborator" });
        }

        project.collaborators.push(userToInvite._id);
        await project.save();

        res.status(200).json({ message: "Collaborator invited successfully", data: project });
    } catch (err) {
        res.status(500).json({ message: "Error inviting collaborator" });
    }
};