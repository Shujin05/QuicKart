import mongoose from "mongoose"; 

// connect to mongoDB database 
export const connectDB = async () => {
    await mongoose.connect('').then(()=> console.log("DB connected"))
} // to insert connection string 