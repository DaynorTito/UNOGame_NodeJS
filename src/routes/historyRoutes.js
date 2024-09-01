import { Router } from "express";
import historyController from "../controllers/historyController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/historyGame', authMiddleware, historyController.getHistoryGame);

export default router;