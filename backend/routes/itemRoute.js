import express from "express"
import { addItem, listItem, updateItemQuantity } from "../controllers/itemController.js"
import multer from "multer"
import verifyAdmin from "../middleware/adminAuth.js";

const itemRouter = express.Router(); 

// Image Storage for uploaded files 
const storage = multer.diskStorage({
    destination: "uploads", 
    filename: (req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

// Middleware upload
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPEG, PNG, and GIF images are allowed"));
        }
    },
});

// Serve static files from the "uploads" directory
itemRouter.use("/uploads", express.static("uploads"));

// define route 
itemRouter.get("/list" , listItem);
itemRouter.post("/add", verifyAdmin, upload.single("image"), addItem);
itemRouter.post("/updateQuantity", verifyAdmin, updateItemQuantity)

export default itemRouter;