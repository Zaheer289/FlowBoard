import express from "express";
import { createProject, saveProject, deleteProject, getProjects } from "../controllers/projects.js";

const router = express.Router();

router.post("/projects", createProject);

router.put("/projects", saveProject);

router.delete("/projects", deleteProject);

router.get("/users/:id/projects", getProjects);

export default router;