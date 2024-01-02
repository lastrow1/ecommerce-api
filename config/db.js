import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


export default function connectDB(){
    try {
        mongoose.connect(process.env.DB_URI);
        console.log(`Database Connected..`);

    
    } catch (error) {
        console.log(error);
    }
}


