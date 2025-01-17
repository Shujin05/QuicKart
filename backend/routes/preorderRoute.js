import express from "express"
import authMiddleware from "../middleware/auth.js";
import { addPreorder, listPreorder } from "../controllers/preorderController.js";

const preorderRouter = express.Router();

preorderRouter.post("/addPreorder", authMiddleware, addPreorder)
preorderRouter.get("/listPreorder", listPreorder)

export default preorderRouter;