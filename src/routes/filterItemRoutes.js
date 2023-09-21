import express from "express";
import filterItemController from "../controllers/filterItemController.js";

const router = express.Router()

router.get('/', filterItemController.searchItems);



export default router