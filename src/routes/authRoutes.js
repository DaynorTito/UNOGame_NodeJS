import { Router } from "express";
import authController from "../controllers/authController.js";
import { authenticationMiddleware } from "../middlewares/loginHandlerMiddleware.js";

const router = Router();

router.use(authenticationMiddleware);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

export default router;
