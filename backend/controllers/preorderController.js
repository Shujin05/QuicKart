import itemModel from "../models/itemModel.js";
import preorderModel from "../models/preorderModel.js";
import userModel from "../models/userModel.js";

// add preorder to database
const addPreorder = async (req, res) => {
    const { userID, itemID, quantityRequested } = req.body; 
    
    const newPreorder = new preorderModel({
        userID: userID,
        itemID: itemID,
        quantityRequested: quantityRequested
    });

    await newPreorder.save();

    return res.json({message: "You have placed a preorder request."});
}

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