import itemModel from "../models/itemModel.js";
import logModel from "../models/logModel.js";

// add item 
const addItem = async (req, res) => {
    
    let image_filename = `${req.file.filename}`

    const item = new itemModel({
        name: req.body.name, 
        voucherAmount: req.body.voucherAmount, 
        category: req.body.category,
        image: image_filename, 
    })
    
    try {
        await item.save(); 

         // Log the admin's action
         const adminEmail = req.adminEmail; 
         const action = "Add Item";
         await new logModel({
             adminEmail,
             action,
         }).save();

        res.json({success:true, message: "Item Added"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error adding item"})
    }
}

// list all items 
const listItem = async (req, res) => {
    try {
        const items = await itemModel.find({}); 
        res.json({success:true, data:items})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// remove item  
const removeItem = async (req, res) => {
    try {
        const item = await itemModel.findById(req.body.id);
        fs.unlink(`uploads/${item.image}`, ()=>{}); // remove image from uploads folder

        await itemModel.findByIdAndDelete(req.body.id); 
        res.json({success:true, message:"Item Removed"})
    } catch (error) {
        console.log(error); 
        res.json({success: false, message:"Error"})
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

        res.json({ success: true, message: "Item quantity updated", data: updatedItem });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating item quantity" });
    }
};



export {addItem, listItem, removeItem, updateItemQuantity}; 