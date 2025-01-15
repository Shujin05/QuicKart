import preorderModel from "../models/preorderModel.js";

// add preorder to database
const addPreorder = async (req, res) => {
    const { userID, itemID, quantityRequested } = req.body; 
    
    const newPreorder = new preorderModel({
        userID: userID,
        itemID: itemID,
        quantityRequested: quantityRequested
    });

    await newPreorder.save();

    const token = createToken(preorder._id);
    return res.json({message: "You have placed a preorder request."});
}

export {addPreorder}; 