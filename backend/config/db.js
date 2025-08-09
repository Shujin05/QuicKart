import mongoose from "mongoose"; 
import dotenv from "dotenv";

dotenv.config();

// connect to mongoDB database 
export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI).then(()=> console.log("DB connected"))
} 
