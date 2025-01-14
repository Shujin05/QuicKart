import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    voucherAmount: { type: Number, required: true },
    image:{type:String, required:true}, 
    quantity: { type: Number, required: true, min: 0},
});

itemSchema.virtual("status").get(function () {
    return this.quantity > 0 ? "in-stock" : "out-of-stock";
});

itemSchema.set("toJSON", { virtuals: true });
itemSchema.set("toObject", { virtuals: true });

const itemModel = mongoose.models.item || mongoose.model("item", itemSchema);
export default itemModel;
