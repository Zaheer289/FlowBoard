import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { validatePassword } from "../utils/validatePassword.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const refreshAccessToken = (req, res) => {
    const refreshToken = req.cookies.refresh_token;

    if(!refreshToken) return res.status(401).json({message: "No refresh token provided."});

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_JWT, (err, payload) =>{
        if(err) return res.status(403).json({message: "Invalid or expired refresh token.", error: err});
        const newAccessToken = generateAccessToken(payload);
        res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 20 * 60 * 1000,
        });
        return res.status(200).json({message: "Access token refreshed successfully."})
    })
}
export const registerUser = async (req, res) => {
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
}

export const logInUser = async (req,res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if (!user) return res.status(401).json({message: "Invalid Credentials!"});

        const valid = await user.verifyPassword(password);
        if (!valid) return res.status(401).json({message: "Invalid Credentials!"});
        const accessToken= generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
       
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 20*60*1000
        });

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60*60*1000*24*20
        });

        res.status(200).json({message: "Logged in successfully!", accessToken, refreshToken});
    }
    catch(err){
        res.status(500).json({
            message: "Error logging in user",
            error: err.message
        })
    }
}