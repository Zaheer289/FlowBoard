import express from 'express';
import { findUserByName } from '../controllers/userController.js';
import { verifyAccessToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users/find/:name', verifyAccessToken, findUserByName);

export default router;
