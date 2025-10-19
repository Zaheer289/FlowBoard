import express from "express";
import { createProject, saveProject, deleteProject, getProjects } from "../controllers/projects.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/projects", verifyAccessToken, createProject);

router.put("/projects", verifyAccessToken, saveProject);

router.delete("/projects", verifyAccessToken, deleteProject);

router.get("/users/:id/projects", verifyAccessToken, getProjects);

export default router;