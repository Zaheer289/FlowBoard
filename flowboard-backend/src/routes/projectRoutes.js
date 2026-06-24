import express from "express";
import { createProject, saveProject, deleteProject, getProjects, getProjectById } from "../controllers/projects.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/projects", verifyAccessToken, createProject);

router.put("/projects", verifyAccessToken, saveProject);

router.delete("/projects", verifyAccessToken, deleteProject);

router.get("/projects", verifyAccessToken, getProjects);

router.get("/projects/:id", verifyAccessToken, getProjectById);

export default router;