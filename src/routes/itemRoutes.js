import express from "express"
import itemController from "../controllers/itemController.js"
import upload from "../utils/upload.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/item", authenticateUser, upload.array('images', 4), itemController.createItem); // Use multer middleware to handle image uploads

router.delete('/item/:itemId', authenticateUser, itemController.deleteItem);



export default router;