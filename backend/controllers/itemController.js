import itemModel from "../models/itemModel.js";
import logModel from "../models/logModel.js";

// add item 
const addItem = async (req, res) => {
    
    let image_filename = `${req.file.filename}`

    const item = new itemModel({
        name: req.body.name, 
        voucherAmount: req.body.voucherAmount, 
        quantity: req.body.quantity,
        homepageQuantity: req.body.quantity, 
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
        if (!req.query.listQuantity) {
            items = await itemModel.find({}); 
        }
        else {
            listQuantity = req.query.listQuantity 
            items = await itemModel.find({}).limit(listQuantity); 
        }
        res.json({success:true, data:items})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

const updateItemQuantity = async (req, res) => {
    const { itemID, quantity, adminID } = req.body;

    if (!Number.isFinite(quantity)) {
        return res.json({ success: false, message: "Invalid quantity provided" });
    }

    if (!adminID) {
        return res.json({ success: false, message: "Admin ID is required" });
    }

    try {
        // Check if the item exists
        const item = await itemModel.findById(itemID);

        if (!item) {
            return res.json({ success: false, message: "Item not found" });
        }

        // Ensure quantity does not go below zero
        const updatedHomepageQuantity = item.homepageQuantity + quantity;
        if (updatedHomepageQuantity < 0) {
            return res.json({ success: false, message: "Resulting homepage quantity cannot be negative" });
        }

        const updatedQuantity = item.quantity + quantity;

        // Update item quantities
        const updatedItem = await itemModel.findByIdAndUpdate(
            itemID,
            {
                quantity: updatedQuantity,
                homepageQuantity: updatedHomepageQuantity,
            },
            { new: true }
        );

        // Log the admin's action
        const log = new logModel({
            adminID: adminID,
            action: "update quantity",
            itemID: updatedItem._id,
        });
        await log.save();

        res.json({ success: true, message: "Item quantity updated", data: updatedItem });
        
    } catch (error) {
        console.error("Error updating item quantity:", error);
        res.status(500).json({ success: false, message: "Error updating item quantity", error: error.message });
    }
};

export {addItem, listItem, updateItemQuantity}; 

