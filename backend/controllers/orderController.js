import itemModel from "../models/itemModel.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

// add order to database
const addOrder = async (req, res) => {
    const { userID, itemID, quantityRequested } = req.body; 
    
    const newOrder = new orderModel({
        userID: userID,
        itemID: itemID,
        quantityRequested: quantityRequested
    });

    await newOrder.save();

    return res.json({message: "Your order is pending approval."});

}

const approveOrder = async (req, res) => {
    const { orderID } = req.body;

    // Validate inputs
    if (!orderID) {
        return res.status(400).json({ message: "Invalid input: orderID is required." });
    }

    try {
        const order = await orderModel.findById(orderID)

        if (!order) {
            return res.status(404).json({ message: "Error, order not found." });
        }

        await orderModel.findByIdAndUpdate(
            orderID,
            { status: "approved" },
        )

        return res.json({ message: "Order has been approved", order });

    } catch (error) {
        console.error("Error updating order:", error); // Log error
        res.status(500).json({ message: "Error updating order status", error });
    }
};

const rejectOrder = async (req, res) => {
    const { orderID } = req.body;

    // Validate inputs
    if (!orderID) {
        return res.status(400).json({ message: "Invalid input: orderID is required." });
    }

    try {
        const order = userModel.findById(req.body.orderID)

        if (!order) {
            return res.status(404).json({ message: "Error, order not found." });
        }

        // return voucher down payment 
        quantityRequested = order.quantityRequested
        const item = await itemModel.findById(order.itemID)
        totalPrice = (item.voucherAmount)*quantityRequested

        userID = order.userID
        user = await userModel.findByIdAndUpdate(
            userID,
            { voucherBalance: voucherBalance + totalPrice },
            { new: true } // Return the updated document
        );

        await orderModel.findByIdAndUpdate(
            orderID,
            { status: "rejected" },
            { new: true } // Return the updated document
        );

        return res.json({ message: "Order has been rejected", order });

    } catch (error) {
        console.error("Error updating order:", error); // Log error
        res.status(500).json({ message: "Error updating order status", error });
    }
};

// list all order 
const listOrder = async (req, res) => {
    try {
        if (!req.body.listQuantity) {
            const orders = await orderModel.find({}); 
        }
        else {
            listQuantity = req.body.listQuantity 
            const orders = await orderModel.find({}).limit(listQuantity); 
        }
        res.json({success:true, data: orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {addOrder, approveOrder, rejectOrder , listOrder}; 

const findOrderByUser = async (req, res) => {
    const {userID} = req.body;
 
    // Validate input
    if (!userID) {
        return res.status(400).json({ message: "Invalid input: userID is required." });
    }

    try {
        const orders = await orderModel.find({userID: userID});

        // Check if orders are found
        if (!orders) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        else {
            return res.json({success: true, orders});
        }
    } catch {
        console.error(error);

        return res.status(500).json("An error has occurred.");
    }

}