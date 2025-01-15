import express from "express"
import authMiddleware from "../middleware/auth.js";
import { addPreorder } from "../controllers/preorderController.js";

const preorderRouter = express.Router();

preorderRouter.post("/addPreorder", authMiddleware, addPreorder)

export default preorderRouter;