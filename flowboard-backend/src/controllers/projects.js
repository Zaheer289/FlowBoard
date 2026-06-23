import Project from "../models/Project.js";
import User from "../models/User.js";
export const createProject = async (req, res) => {
    const payload ={...req.body, owner: req.user.id || req.user._id};
    delete payload.template;
    try{
        const newProject = new Project(payload);
        await newProject.save();
        await User.findByIdAndUpdate(payload.owner, {
            $push: { projects: newProject._id },
        });
        return res.status(201).json({message: "Data saved successfully", body: newProject});
    }
    catch(err){
        return res.status(500).json({message: "Error saving data"});
    }
    
}

export const saveProject = async (req, res) => {}

export const deleteProject = async (req, res) => {
    const {projectId} = req.body;
    try{
        await Project.findByIdAndDelete(projectId);
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { projects:projectId },
        });
        return res.status(200).json({message: "Data deleted successfully"});
    }
    catch(err){
        return res.status(500).json({message: "Error deleting data"});
    }
}

export const getProjects = async (req, res) => {
    const userId = req.params.id;
    const {archived, starred} = req.query;
    let query = {owner: userId} 
    if(archived!== undefined) query.archived = archived==="true";     
    else query.archived = false
    if(starred!== undefined) query.starred = starred==="true"; 
    
    const projects = await Project.find(query).sort({updatedAt: -1});

    
    res.status(200).json({message: "Data retrieved successfully!", data: projects});

}

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
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