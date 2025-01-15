import jwt from 'jsonwebtoken';
import adminModel from '../models/adminModel.js';

// Middleware to check if the user is an admin
const verifyAdmin = async (req, res, next) => {
    const {token} = req.headers;

    if (!token) {
        return res.json({success:false, message:"Not Authorised. Only Admins have access to this feature"})
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET); 
        const admin = await adminModel.findById(token_decode.id);
        res.body.adminId = token_decode.id; 

        if (!admin) {
            return res.status(403).json({ success: false, message: 'Admin not found' });
        } 
        next(); 
        
    } catch (error) {
        console.error(error);
        res.json({success:false, message:"error"});
    }
};

export default verifyAdmin; 