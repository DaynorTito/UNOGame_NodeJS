import { Router } from "express";
import historyController from "../controllers/historyController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requestTracking } from "../middlewares/requestTracking/requestTracking.js";

const router = Router();

router.get('/historyGame', authMiddleware, requestTracking(historyController.getHistoryGame));

export default router;