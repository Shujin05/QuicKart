import express from "express"
import {addOrder, deliverOrder, findOrderByUser, listOrder} from "../controllers/orderController.js"
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/addOrder" , authMiddleware, addOrder);
orderRouter.post("/deliverOrder", authMiddleware, deliverOrder);
orderRouter.get("/listOrder", listOrder);
orderRouter.get("/findOrderByUser", authMiddleware, findOrderByUser)

export default orderRouter;