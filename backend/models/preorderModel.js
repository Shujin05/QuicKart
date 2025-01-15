import mongoose from "mongoose"

// records transactions when users place a preorder
const preorderSchema = new mongoose.Schema({
    userID: {type:String, required:true}, 
    createdAt: {type:Date, default:Date.now}, 
    itemID: {type:String, required:true}, 
    quantityRequested: {type: Number, required: true},
});

const preorderModel = mongoose.models.preorder || mongoose.model("preorder", preorderSchema); 
export default preorderModel; 