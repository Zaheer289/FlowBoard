import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: user.name
        },
        process.env.ACCESS_TOKEN_JWT,
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
            name: user.name
        },
        process.env.REFRESH_TOKEN_JWT,
        {
            expiresIn: "14d"
        }
    );
};