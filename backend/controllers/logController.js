import logModel from "../models/logModel.js";

// Get logs of admin actions (timeframe: 1 week ago)
const getLogs = async (req, res) => {
    try {
        // Calculate the date one week ago
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        // Query logs created within the last week
        const logs = await logModel.find({
            timestamp: { $gte: oneWeekAgo },
        });

        res.json({ success: true, data: logs });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching logs" });
    }
};
export {getLogs}; 