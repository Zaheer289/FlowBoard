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
        return res.status(201).json({message: "Data saved successfully", body: payload});
    }
    catch(err){
        return res.status(500).json({message: "Error saving data"});
    }
    
}

export const saveProject = () => {}

export const deleteProject = () => {}

export const getProjects = () => {}