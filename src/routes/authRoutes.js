import express from "express";
import authControllers from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/logout", authControllers.logout);
router.get(
  "/confirm-email/:confirmationToken",
  authControllers.emailConfirmation
);

export default router;
