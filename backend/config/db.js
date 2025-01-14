import mongoose from "mongoose"; 

// connect to mongoDB database 
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://e1454207:Nus12345678@hack-for-good-2025.ceiln.mongodb.net/?retryWrites=true&w=majority&appName=hack-for-good-2025').then(()=> console.log("DB connected"))
} 

// mongodb+srv://limshujin2005:hackforgood2025@cluster0.3pydb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0