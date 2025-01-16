import jwt from "jsonwebtoken"

const verifyAdmin = async (req, res, next) => {
    const {token} = req.headers;
    if (!token) {
        return res.json({success:false, message:"Not Authorised. Only admins are allowed to access this function."})
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET); 
        req.body.adminID = token_decode.id; 
        next(); 
    }
    catch (error) {
        console.log(error)
        res.json({success:false, message:"error"})
    }
}

export default verifyAdmin; 