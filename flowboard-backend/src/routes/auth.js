import mongoose from "mongoose";
import bcrypt from "bcrypt";
import express from "express";
import User from "../models/User.js";
import { validatePassword } from "../utils/validatePassword.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    const {username, email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists!"});
        }
        if(!validatePassword(password)){
            return res.status(400).json({message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol."});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name: username,
            email: email,
            passwordHash: hashedPassword
        })
        await newUser.save();
        res.status(201).json({message: "User registered successfully"});
    }
    catch(err){
        res.status(500).json({
            message: "Error registering user",
            error: err.message
        })
    }
});

router.post("/login", async (req,res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if (!user) return res.status(401).json({message: "Invalid Credentials!"});
        const valid = await user.verifyPassword(password);
        if (!valid) return res.status(401).json({message: "Invalid Credentials!"});
        res.status(200).json({message: "Logged in successfully!"});
    }
    catch(err){
        res.status(500).json({
            message: "Error registering user",
            error: err.message
        })
    }
})
export default router;