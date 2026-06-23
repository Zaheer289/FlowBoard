import express from "express";
import { logInUser, registerUser, refreshAccessToken, verifyAuth } from "../controllers/auth.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", logInUser);

router.post("/refresh", refreshAccessToken);

router.get("/verify", verifyAccessToken, verifyAuth);

export default router;