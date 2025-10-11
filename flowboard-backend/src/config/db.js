import mongoose from 'mongoose';

export const connectDB = async () =>{
    const mongoURI = process.env.MONGO_URI;
    try{
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }
    catch(error){
        console.log(`Connection error: ${error.message}`);
        process.exit(1);
    }
}