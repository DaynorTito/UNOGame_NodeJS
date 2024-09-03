import { Router } from "express";
import scoreController from "../controllers/scoreController.js";
import { requestTracking } from "../middlewares/requestTracking/requestTracking.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Scores
 *   description: API for managing scores
 */

/**
 * @swagger
 * /api/v1/scores:
 *   post:
 *     summary: Create a new score
 *     tags: [Scores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               playerId:
 *                 type: string
 *                 description: The ID of the player
 *                 example: "player-123"
 *               gameId:
 *                 type: string
 *                 description: The ID of the game
 *                 example: "game-456"
 *               score:
 *                 type: integer
 *                 description: The score achieved by the player
 *                 example: 100
 *             required:
 *               - playerId
 *               - gameId
 *               - score
 *     responses:
 *       201:
 *         description: Successfully created a new score
 *       400:
 *         description: Bad request, invalid data
 *       500:
 *         description: Internal server error
 */
router.post('/scores', scoreController.createScore);

/**
 * @swagger
 * /api/v1/scores:
 *   get:
 *     summary: Retrieve all scores
 *     tags: [Scores]
 *     responses:
 *       200:
 *         description: Successfully retrieved all scores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the score
 *                     example: "score-789"
 *                   playerId:
 *                     type: string
 *                     description: The ID of the player
 *                     example: "player-123"
 *                   gameId:
 *                     type: string
 *                     description: The ID of the game
 *                     example: "game-456"
 *                   score:
 *                     type: integer
 *                     description: The score achieved by the player
 *                     example: 100
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: When the score was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: When the score was last updated
 *       500:
 *         description: Internal server error
 */
router.get('/scores', requestTracking(scoreController.getScores));

/**
 * @swagger
 * /api/v1/scores/{id}:
 *   get:
 *     summary: Retrieve a score by its ID
 *     tags: [Scores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "score-789"
 *     responses:
 *       200:
 *         description: Successfully retrieved the score
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the score
 *                   example: "score-789"
 *                 playerId:
 *                   type: string
 *                   description: The ID of the player
 *                   example: "player-123"
 *                 gameId:
 *                   type: string
 *                   description: The ID of the game
 *                   example: "game-456"
 *                 score:
 *                   type: integer
 *                   description: The score achieved by the player
 *                   example: 100
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: When the score was created
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: When the score was last updated
 *       404:
 *         description: Score not found
 *       500:
 *         description: Internal server error
 */
router.get('/scores/:id', scoreController.getScoreById);

/**
 * @swagger
 * /api/v1/scores/{id}:
 *   put:
 *     summary: Update a score by its ID
 *     tags: [Scores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "score-789"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               playerId:
 *                 type: string
 *                 description: The ID of the player
 *                 example: "player-123"
 *               gameId:
 *                 type: string
 *                 description: The ID of the game
 *                 example: "game-456"
 *               score:
 *                 type: integer
 *                 description: The score achieved by the player
 *                 example: 150
 *             required:
 *               - playerId
 *               - gameId
 *               - score
 *     responses:
 *       200:
 *         description: Successfully updated the score
 *       400:
 *         description: Bad request, invalid data
 *       404:
 *         description: Score not found
 *       500:
 *         description: Internal server error
 */
router.put('/scores/:id', scoreController.updateScore);

/**
 * @swagger
 * /api/v1/scores/{id}:
 *   delete:
 *     summary: Delete a score by its ID
 *     tags: [Scores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "score-789"
 *     responses:
 *       204:
 *         description: Successfully deleted the score
 *       404:
 *         description: Score not found
 *       500:
 *         description: Internal server error
 */
router.delete('/scores/:id', scoreController.deleteScore);
router.get('/scoresPlayers', requestTracking(scoreController.getPlayersScores));


export default router;
