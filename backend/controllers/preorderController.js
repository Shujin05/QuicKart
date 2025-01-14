import itemModel from "../models/itemModel.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import preorderModel from "../models/preorderModel.js";

// add preorder to database
const addPreorder = async (req, res) => {
    const { userID, itemID, quantityRequested } = req.body; // params referenced from preorderModel.js
    
    const newPreorder = new preorderModel({
        userID: userID,
        itemID: itemID,
        quantityRequested: quantityRequested
    });

    const preorder = await newPreorder.save();

    const token = createToken(preorder._id);
    return res.json({message: "You have placed a preorder request."});
}

// move preorder to order when stock is in.