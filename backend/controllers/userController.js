import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// Login function 
const loginUser = async (req, res) => {
    const {email,password} = req.body; 
    try {
        const user = await userModel.findOne({email}); 

        if (!user) {
            return res.json({success:false, message:"User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password); 

        if (!isMatch) {
            return res.json({success:false, message:"Invalid credentials"})
        }

        if (user.suspended) {
            return res.json({ success: false, message: "Your account is suspended. Contact admin for more details." });
        }

        const token = createToken(user._id); 
        res.json({success:true, token})
    } catch (error) {
        console.log(error); 
        res.json({success: false, message: error})
    }
}

// create token 
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
    const {name, password, email} = req.body; 
    try {
        // check if account already exists
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false, message:"Account already exists"})
        }

        // validate email and password 
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})
        }

        if (password.length < 8 ) {
            return res.json({success:false, message:"Password length should be greater than 8"})
        }

        // hash user password 
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt)

        // save user to database 
        const newUser = new userModel({
            name: name, 
            email: email, 
            password: hashedPassword, 
        })

        const user = await newUser.save()

        // create token 
        const token = createToken(user._id)
        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// Change password function
const changePassword = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    try {
        // Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Validate current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Current password is incorrect" });
        }

        // Validate new password
        if (newPassword.length < 8) {
            return res.json({ success: false, message: "Password length should be greater than 8" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password
        user.password = hashedNewPassword;
        await user.save();

        res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating password" });
    }
};

// Admin reset password function - current password not required
const resetPassword = async (req, res) => {
    const { userEmail, newPassword } = req.body;

    try {
        // Find the user whose password needs to be reset
        const user = await userModel.findOne({ email: userEmail });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Validate new password
        if (newPassword.length < 8) {
            return res.json({ success: false, message: "Password length should be greater than 8" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password
        user.password = hashedNewPassword;
        await user.save();

        res.json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error resetting password" });
    }
};

// Suspend user function
const suspendUser = async (req, res) => {
    const { userEmail } = req.body;

    try {
        // Find the user to be suspended
        const user = await userModel.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Suspend the user account
        user.suspended = true;
        await user.save();

        res.json({
            success: true,
            message: `User account for ${userEmail} has been suspended successfully`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while suspending the user account",
        });
    }
};

export {loginUser, registerUser, changePassword, resetPassword, suspendUser}; 