import dotenv from "dotenv";
import express from "express";
import {connectDB} from './config/db.js'
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";

dotenv.config();

const app = express();
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
connectDB();
app.listen(PORT, ()=>{
    console.log(`app listening on port: ${PORT}`)
})