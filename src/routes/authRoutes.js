import { Router } from "express";
import authController from "../controllers/authController.js";

const router = Router();

router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

export default router;
