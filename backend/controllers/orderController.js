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

        // check if item balance is sufficient 
        if (item.homepageQuantity < quantityRequested) {
            return res.status(400).json({ success: false, message: "Quantity of items requested exceeds available stock." });
        }

        // Deduct voucher balance from the user
        user.voucherBalance -= totalPrice;
        await user.save();

        // Deduct home page quantity 
        item.homepageQuantity -= quantityRequested; 
        await item.save(); 

        // Create a new order
        const newOrder = new orderModel({
            userID,
            itemID,
            quantityRequested,
        });

        // Save the order to the database
        await newOrder.save();

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Your order is pending approval.",
            order: newOrder,
        });
    } catch (error) {
        console.error("Error adding order:", error);
        return res.status(500).json({ success: false, message: "Internal server error.", error: error.message });
    }
};

const deliverOrder = async (req, res) => {
    const { orderID } = req.body;

    // Validate inputs
    if (!orderID) {
        return res.status(400).json({ success: false, message: "Invalid input: orderID is required." });
    }

    try {
        const order = await orderModel.findById(orderID); 

        if (!order) {
            return res.status(404).json({ success: false, message: "Error, order not found." });
        }

        order.status = "delivered";
        await order.save(); 

        // deduct quantity from stock 
        const item = await itemModel.findById(order.itemID); 
        item.quantity -= order.quantityRequested; 

        await item.save();

        return res.json({ success: true, message: "Order has been delivered", order });

    } catch (error) {
        console.error("Error updating order:", error); // Log error
        res.status(500).json({ success: false, message: "Error updating order status", error });
    }
};

const listOrder = async (req, res) => {
    try {
        let orders;

        if (!req.query.listQuantity) {
            orders = await orderModel.find({}).sort({ createdAt: -1 });
        } else {
            const listQuantity = parseInt(req.query.listQuantity); // Ensure it's a number
            orders = await orderModel.find({}).sort({ createdAt: -1 }).limit(listQuantity);
        }

        // Map orders and fetch user/item details
        const ordersWithDetails = await Promise.all(
            orders.map(async (order) => {
                const user = await userModel.findById(order.userID).select("name");
                const item = await itemModel.findById(order.itemID).select("name voucherAmount");
                return {
                    ...order._doc, // Spread order fields
                    userName: user ? user.name : "Unknown User",
                    itemName: item ? item.name : "Unknown Item",
                    itemPrice: item? item.voucherAmount : "Unknown Price"
                };
            })
        );

        return res.status(200).json({ success: true, data: ordersWithDetails });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error fetching orders" });
    }
}

const findOrderByUser = async (req, res) => {
    const {userID} = req.body;
    // Validate input
    if (!userID) {
        return res.status(400).json({ success: false, message: "Invalid input: userID is required." });
    }

    try {
        let orders; 
        if (!req.query.listQuantity) {
            orders = await orderModel.find({userID: userID}).sort({ createdAt: -1 });
        } else {
            const listQuantity = req.query.listQuantity;
            orders = await orderModel.find({userID: userID}).limit(listQuantity).sort({ createdAt: -1 });
        }
       

        // Check if orders are found
        if (!orders) {
            return res.status(404).json({ success: false, message: "No orders found for this user." });
        }

        // Map orders and fetch user/item details
        const ordersWithDetails = await Promise.all(
            orders.map(async (order) => {
                const user = await userModel.findById(order.userID).select("name");
                const item = await itemModel.findById(order.itemID).select("name voucherAmount");
                return {
                    ...order._doc, // Spread order fields
                    userName: user ? user.name : "Unknown User",
                    itemName: item ? item.name : "Unknown Item",
                    itemPrice: item? item.voucherAmount : "Unknown Price"
                };
            })
        );

        return res.status(200).json({ success: true, data: ordersWithDetails });

    } catch(error) {
        console.error(error);

        return res.status(500).json({ success: false, message: "An error has occured" });
    }
}

export {addOrder, deliverOrder , listOrder, findOrderByUser}; 
