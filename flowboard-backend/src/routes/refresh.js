import { generateAccessToken } from "../utils/jwt.js";
import jwt from 'jsonwebtoken';

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