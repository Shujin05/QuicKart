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

const changeOrderStatus = async (req, res) => {
    const { orderID, newStatus } = req.body;

    // Validate inputs
    if (!orderID || !newStatus) {
        return res.status(400).json({ message: "Invalid input: orderID and status are required." });
    }

    // Restrict status to approved or rejected
    const allowedStatuses = ["approved", "rejected"];
    if (!allowedStatuses.includes(newStatus)) {
        return res.status(400).json({ message: `Invalid status. Allowed values: ${allowedStatuses.join(", ")}` });
    }

    try {
        const order = await orderModel.findByIdAndUpdate(
            orderID,
            { status: newStatus },
            { new: true } // Return the updated document
        );

        if (!order) {
            return res.status(404).json({ message: "Error, order not found." });
        }

        return res.json({ message: `Order has been ${newStatus}`, order });

    } catch (error) {
        console.error("Error updating order:", error); // Log error
        res.status(500).json({ message: "Error updating order status", error });
    }
};

export {addOrder, changeOrderStatus}; 

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