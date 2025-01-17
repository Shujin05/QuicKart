import itemModel from "../models/itemModel.js";
import preorderModel from "../models/preorderModel.js";
import userModel from "../models/userModel.js";

// Add preorder to the database
const addPreorder = async (req, res) => {
    try {
        const { userID, itemID, quantityRequested } = req.body;

        // Create a new preorder instance
        const newPreorder = new preorderModel({
            userID,
            itemID,
            quantityRequested
        });

        // Save the preorder to the database
        await newPreorder.save();

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "You have placed a preorder request."
        });
    } catch (error) {
        // Log the error and respond with failure
        console.error("Error creating preorder:", error);
        return res.status(500).json({
            success: false,
            message: "Error creating preorder"
        });
    }
};

const listPreorder = async (req, res) => {
    try {
        let preorders;

        if (!req.body.listQuantity) {
            preorders = await preorderModel.find({});
        } else {
            const listQuantity = parseInt(req.body.listQuantity); // Ensure it's a number
            preorders = await preorderModel.find({}).limit(listQuantity);
        }

        // Map orders and fetch user/item details
        const preordersWithDetails = await Promise.all(
            preorders.map(async (preorder) => {
                const user = await userModel.findById(preorder.userID).select("name");
                const item = await itemModel.findById(preorder.itemID).select("name voucherAmount");
                return {
                    ...preorder._doc, // Spread order fields
                    userName: user ? user.name : "Unknown User",
                    itemName: item ? item.name : "Unknown Item",
                    itemPrice: item? item.voucherAmount : "Unknown Price"
                };
            })
        );

        return res.status(200).json({ success: true, data: preordersWithDetails });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error fetching preorders" });
    }
}

export {addPreorder, listPreorder}; 