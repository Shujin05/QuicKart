import itemModel from "../models/itemModel.js";
import logModel from "../models/logModel.js";

// add item 
const addItem = async (req, res) => {
    
    let image_filename = `${req.file.filename}`

    const item = new itemModel({
        name: req.body.name, 
        voucherAmount: req.body.voucherAmount, 
        image: image_filename, 
    })
    
    try {
        await item.save(); 

         // Log the admin's action
         const log = new logModel({
            adminID: req.body.adminID,
            action: "add", 
            itemId: item._id
         })
         await log.save(); 

        res.json({success:true, message: "Item Added"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error adding item"})
    }
}

// list all items 
const listItem = async (req, res) => {
    try {
        let items
        if (!req.body.listQuantity) {
            items = await itemModel.find({}); 
        }
        else {
            listQuantity = req.body.listQuantity 
            items = await itemModel.find({}).limit(listQuantity); 
        }
        res.json({success:true, data:items})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

const updateItemQuantity = async (req, res) => {
    const { id, quantity } = req.body; 
    // Validate input
    if (quantity == null || typeof quantity !== "number") {
        return res.json({ success: false, message: "Invalid quantity provided" });
    }

    try {
        // Check if the item exists
        const item = await itemModel.findById(id);

        if (!item) {
            return res.json({ success: false, message: "Item not found" });
        }

        // Ensure quantity does not go below zero
        const updatedQuantity = item.quantity + quantity;
        if (updatedQuantity < 0) {
            return res.json({ success: false, message: "Resulting quantity cannot be negative" });
        }

        const updatedItem = await itemModel.findByIdAndUpdate(
            id,
            { quantity: updatedQuantity },
            { new: true } // Return the updated item
        );

        // Log the admin's action
        const log = new logModel({
            adminID: req.body.adminID,
            action: "update quantity", 
            itemId: updatedItem.id 
         })
         await log.save(); 

        res.json({ success: true, message: "Item quantity updated", data: updatedItem });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating item quantity" });
    }
};



export {addItem, listItem, updateItemQuantity}; 