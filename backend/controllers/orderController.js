import itemModel from "../models/itemModel.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

// add order to database
const addOrder = async (req, res) => {
    const { userID, itemID, quantityRequested } = req.body; // params referenced from orderModel.js
    
    const newOrder = new orderModel({
        userID: userID,
        itemID: itemID,
        quantityRequested: quantityRequested
    });

    const order = await newOrder.save();

    // create order token?
    const token = createToken(order._id);
    return res.json({message: "Your order is pending approval."});

}

// let admin approve or reject 
const approveOrder = async (req, res) => {
    const { orderID, status } = req.body;
    try {
        const order = await orderModel.findByIdAndUpdate(
            orderID,
            { status: status }, // Update the status to 'approved' or 'rejected'
            { new: true } 
        );

    if (!order) {
        return res.status(404).json("error, order not found.");
    }

    return res.json({message: "order has been ${status}", order});

    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error });
    }
}





