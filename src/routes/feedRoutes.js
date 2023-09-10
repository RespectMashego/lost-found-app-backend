import express from "express"
import feedController from "../controllers/feedController.js"

const router = express.Router()

router.get("/", feedController.getFeed)

export default router