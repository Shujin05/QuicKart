import mongoose from "mongoose"; 

// connect to mongoDB database 
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://limshujin2005:hackforgood2025@cluster0.3pydb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=> console.log("DB connected"))
} 
