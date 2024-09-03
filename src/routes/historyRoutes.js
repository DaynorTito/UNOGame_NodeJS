import { Router } from "express";
import historyController from "../controllers/historyController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requestTracking } from "../middlewares/requestTracking/requestTracking.js";

const router = Router();

/**
 * @swagger
 * /api/v1/historyGame:
 *   get:
 *     summary: Retrieve the history of games for the authenticated user based on the provided gameId
 *     tags: [History]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gameId:
 *                 type: string
 *                 description: "The unique identifier for the game to retrieve history for."
 *                 example: "2ce66004-a1d1-45dc-83ac-eb94a272b995"
 *             required:
 *               - gameId
 *     responses:
 *       200:
 *         description: Successfully get history
 */
router.get('/historyGame', authMiddleware, requestTracking(historyController.getHistoryGame));

export default router;