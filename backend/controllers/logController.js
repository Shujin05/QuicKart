import logModel from "../models/logModel.js";
import adminModel from "../models/adminModel.js";
import itemModel from "../models/itemModel.js";

const getLogs = async (req, res) => {
    try {
        // Calculate the date one week ago
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        // Query logs created within the last week
        const logs = await logModel.find({ timestamp: { $gte: oneWeekAgo } }).sort({ createdAt: -1 });

        // Fetch admin and item names for each log
        const logsWithDetails = await Promise.all(
            logs.map(async (log) => {
                const admin = await adminModel.findById(log.adminID).select("name");
                const item = await itemModel.findById(log.itemID).select("name");
                return {
                    ...log._doc,
                    adminName: admin ? admin.name : "Unknown Admin",
                    itemName: item ? item.name : "Unknown Item",
                };
            })
        );

        res.json({ success: true, data: logsWithDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching logs" });
    }
};

export { getLogs };