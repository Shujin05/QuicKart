import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    adminID: { type: String, required: true },
    action: { type: String, required: true }, // "update quantity", "add", "remove"
    itemID: {type: String, required: true}, 
    timestamp: { type: Date, default: Date.now },
});

const logModel = mongoose.models.Log || mongoose.model("Log", logSchema);
export default logModel;