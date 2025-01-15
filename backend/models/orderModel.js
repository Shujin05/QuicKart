import mongoose from "mongoose"

// records transactions when users place an order
const orderSchema = new mongoose.Schema({
    userID: {type:String, required:true}, 
    createdAt: {type:Date, default:Date.now}, 
    itemID: {type:String, required:true}, 
    quantityRequested: {type: Number, required: true},
    status: {type: String, default: "pending"}, // approved, rejected, pending
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema); 
export default orderModel; 