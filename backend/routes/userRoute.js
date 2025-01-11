import express from "express"
import {changePassword, loginUser, registerUser, resetPassword, suspendUser} from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/changePassword", changePassword)
userRouter.post("/resetPassword", resetPassword)
userRouter.post("/suspendUser", suspendUser)

export default userRouter; 