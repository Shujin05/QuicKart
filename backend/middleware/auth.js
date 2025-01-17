import jwt from "jsonwebtoken"
import userModel from "../models/userModel";

const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;
    if (!token) {
        return res.json({success:false, message:"Not Authorised. Please login to your account"})
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET); 
        const user = userModel.findById(token_decode._id)
        if (!user) {
            return res.json({success: false, message: "Please login to your account."})
        }
        req.body.userID = token_decode.id; 
        next(); 
    }
    catch (error) {
        console.log(error)
        res.json({success:false, message:"error"})
    }
}

export default authMiddleware; 