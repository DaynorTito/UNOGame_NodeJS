import { Router } from "express";
import authController from "../controllers/authController.js";
import { requestTracking } from "../middlewares/requestTracking/requestTracking.js";

const router = Router();

router.post("/login", requestTracking(authController.loginUser));
router.post("/logout", requestTracking(authController.logoutUser));

export default router;
