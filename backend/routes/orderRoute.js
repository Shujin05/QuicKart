import express from "express"
import {addOrder, changeOrderStatus} from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/addOrder", addOrder);
orderRouter.post("/changeOrderStatus", changeOrderStatus);

export default orderRouter;