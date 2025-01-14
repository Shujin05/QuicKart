import express from "express"
import {addOrder, changeOrderStatus} from "../controllers/orderController.js"
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/addOrder", authMiddleware , addOrder);
orderRouter.post("/changeOrderStatus", authMiddleware , changeOrderStatus);

export default orderRouter;