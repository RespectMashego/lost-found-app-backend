import express from "express"
import itemController from "../controllers/itemController.js"
import upload from "../utils/upload.js";

const router = express.Router()

router.post("/item", upload.array('images', 4), itemController.createItem); // Use multer middleware to handle image uploads



export default router;