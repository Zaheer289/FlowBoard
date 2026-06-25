import express from "express";
import { createProject, saveProject, deleteProject, getProjects, getProjectById, updateProject } from "../controllers/projects.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/projects", verifyAccessToken, createProject);

router.put("/projects/:id/save", verifyAccessToken, saveProject);

router.delete("/projects/:id", verifyAccessToken, deleteProject);

router.get("/projects", verifyAccessToken, getProjects);

router.get("/projects/:id", verifyAccessToken, getProjectById);

router.put("/projects/:id", verifyAccessToken, updateProject);

export default router;