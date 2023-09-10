import express from "express"
import profileController from "../controllers/profileController.js"
import { authenticateUser } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/", authenticateUser, profileController.getUserPostedItems)

export default router