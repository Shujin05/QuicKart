import express from "express"
import { getLogs } from "../controllers/logController.js";

const logRouter = express.Router()

logRouter.post('/getLogs', getLogs)

export default logRouter; 