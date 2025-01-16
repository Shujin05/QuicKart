import express from "express"
import { adminAddUser, changePassword, loginAdmin, registerAdmin, resetPassword, suspendUser } from "../controllers/adminController.js";
import verifyAdmin from "../middleware/adminAuth.js";

const adminRouter = express.Router()

adminRouter.post('/register', registerAdmin)
adminRouter.post('/login', loginAdmin)
adminRouter.post("/changePassword", changePassword)
adminRouter.post('/resetPassword', verifyAdmin, resetPassword)
adminRouter.post('/suspendUser', verifyAdmin, suspendUser)
//adminRouter.post('/adminAddUser', verifyAdmin, adminAddUser)

export default adminRouter; 