import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    adminEmail: { type: String, required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const logModel = mongoose.models.Log || mongoose.model("Log", logSchema);

export default logModel;