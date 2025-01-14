import mongoose from "mongoose"

// records transactions when users place a preorder
const preorderSchema = new mongoose.Schema({
    userID: {type:String, required:true}, 
    createdAt: {type:Date, default:Date.now}, 
    itemID: {type:String, required:true}, 
    quantityRequested: {type: Number, required: true},
});
// no order status because no stock.
// when stock arrives, move the row from preorder table to order table, add status = "pending".

const preorderModel = mongoose.models.preorder || mongoose.model("preorder", preorderSchema); 
export default preorderModel; 