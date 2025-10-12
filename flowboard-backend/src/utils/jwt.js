import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_JWT = process.env.ACCESS_TOKEN_JWT;
const REFRESH_TOKEN_JWT = process.env.REFRESH_TOKEN_JWT;

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        ACCESS_TOKEN_JWT,
        {
            expiresIn: "20m"
        }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        REFRESH_TOKEN_JWT,
        {
            expiresIn: "14d"
        }
    );
};