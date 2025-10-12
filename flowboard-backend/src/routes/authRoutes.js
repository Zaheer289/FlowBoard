import express from "express";
import { logInUser, registerUser, refreshAccessToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", logInUser);

router.post("/refresh",refreshAccessToken);

export default router;