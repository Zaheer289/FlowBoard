import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import {connectDB} from './config/db.js'
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import projectRouter from "./routes/projectRoutes.js"

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT||5000;


app.use(cors({
    origin: ["http://localhost:3000"],
    methods:["PUT","POST","DELETE","GET"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hello world!")

})
app.use("/api/auth",authRouter);
app.use("/api",projectRouter);
connectDB();

const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["PUT", "POST", "DELETE", "GET"],
        credentials: true,
    }
});

io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
        return next(new Error('Authentication error: Token missing'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error('Authentication error: Invalid token'));
        }
        socket.user = decoded;
        next();
    });
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.id || socket.user._id}`);

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.user.id || socket.user._id}`);
    });
});

httpServer.listen(PORT, ()=>{
    console.log(`app listening on port: ${PORT}`)
})

export { io };