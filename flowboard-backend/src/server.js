import dotenv from "dotenv";
import express from "express";
import {connectDB} from './config/db.js'
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT||5000;

app.use(express.json())
app.use(cors({
    origin: ["https://localhost:3000"],
    methods:["PUT","POST","DELETE","GET"],
    credentials: true,
}))

app.get('/',(req,res)=>{
    res.send("Hello world!")

})
connectDB();
app.listen(PORT, ()=>{
    console.log(`app listening on port: ${PORT}`)
})