import itemModel from "../models/itemModel.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

// add order - user 
const addOrder = async (req, res) => {
    const { userID, itemID, quantityRequested } = req.body;

    try {
        // Validate inputs
        if (!userID || !itemID || !quantityRequested) {
            return res.status(400).json({ success: false, message: "Invalid input: All fields are required." });
        }

        // Fetch user and item details
        const user = await userModel.findById(userID);
        if (!user) {
            return res.status(404).json({ success: false, message: "Error: User not found." });
        }

        const item = await itemModel.findById(itemID);
        if (!item) {
            return res.status(404).json({ success: false, message: "Error: Item not found." });
        }

        // Calculate total price
        const totalPrice = item.voucherAmount * quantityRequested;

        // Check if the user has enough vouchers
        if (user.voucherBalance < totalPrice) {
            return res.status(400).json({ success: false, message: "Insufficient voucher balance." });
        }

        // Deduct voucher balance from the user
        user.voucherBalance -= totalPrice;
        await user.save();

        // Create a new order
        const newOrder = new orderModel({
            userID,
            itemID,
            quantityRequested,
            status: "pending", // Optional: Set an initial status for the order
        });

        // Save the order to the database
        await newOrder.save();

        // Return success response
        return res.status(201).json({
            success: true,
            message: "Your order is pending approval.",
            order: newOrder,
        });
    } catch (error) {
        console.error("Error adding order:", error);
        return res.status(500).json({ success: false, message: "Internal server error.", error: error.message });
    }
};

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
        const order = orderModel.findById(req.body.orderID)

        if (!order) {
            return res.status(404).json({ message: "Error, order not found." });
        }

        // Fetch the item related to the order
        const item = await itemModel.findById(order.itemID);
        if (!item) {
            return res.status(404).json({ message: "Error: Item not found." });
        }

        // Calculate total price to return
        const quantityRequested = order.quantityRequested;
        const totalPrice = item.voucherAmount * quantityRequested;

        // Fetch the user and update voucher balance
        const user = await userModel.findById(order.userID);
        if (!user) {
            return res.status(404).json({ message: "Error: User not found." });
        }

        // Update the user's voucher balance
        user.voucherBalance += totalPrice; // Assumes voucherBalance is a number
        await user.save();

        // Update the order status to "rejected"
        order.status = "rejected";
        await order.save();

        return res.json({ message: "Order has been rejected", order });

    } catch (error) {
        console.error("Error updating order:", error); // Log error
        res.status(500).json({ message: "Error updating order status", error });
    }
};

// list all order 
const listOrder = async (req, res) => {
    try {
        let orders; 
        if (!req.body.listQuantity) {
            orders = await orderModel.find({});
        }
        else {
            listQuantity = req.body.listQuantity 
            orders = await orderModel.find({}).limit(listQuantity);

        }
        res.json({success:true, data: orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {addOrder, approveOrder, rejectOrder , listOrder}; 


