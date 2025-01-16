import express from "express"
import {addOrder, approveOrder, findOrderByUser, listOrder, rejectOrder} from "../controllers/orderController.js"
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/addOrder" , authMiddleware, addOrder);
orderRouter.post("/rejectOrder", authMiddleware, rejectOrder);
orderRouter.post("/approveOrder", authMiddleware, approveOrder);
orderRouter.get("/listOrder", listOrder);
orderRouter.get("/findOrderByUser", authMiddleware, findOrderByUser)

export default orderRouter;