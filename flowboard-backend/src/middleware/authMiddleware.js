import jwt from 'jsonwebtoken';

export const verifyAccessToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json({message: "No token provided"});
    jwt.verify(token, process.env.ACCESS_TOKEN_JWT, (err, payload) =>{
        if(err) return res.status(403).json({message: "Invalid or expired token", error:err});
        req.user = payload;
        next();
    })
}