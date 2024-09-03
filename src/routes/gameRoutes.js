import { Router } from "express";
import gameController from "../controllers/gameController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requestTracking } from "../middlewares/requestTracking/requestTracking.js";
import { validateGame } from "../middlewares/payloadValidation/gameSchemaValidation.js";
import { validatePlayCard } from "../middlewares/payloadValidation/playCardSchemaValidation.js";
import { validateDrawCard } from "../middlewares/payloadValidation/drewCardSchemaValidation.js";
import { validateSayUno } from "../middlewares/payloadValidation/sayUnoSchemaValidation.js";
import { validateChallengePlayer } from "../middlewares/payloadValidation/challengerPlayerSchemaValidation.js";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Games
 *   description: API for managing games
 */

/**
 * @swagger
 * /api/v1/games:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the game
 *                 example: "Uno game"
 *               maxPlayers:
 *                 type: integer
 *                 description: Maximum number of players allowed in the game
 *                 example: 5
 *               rules:
 *                 type: string
 *                 description: Game rules
 *                 example: "you cannot pick up cards"
 *             required:
 *               - title
 *               - maxPlayers
 *               - rules
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Game created successfully
 *       400:
 *         description: Invalid game data
 *       401:
 *         description: Not authorized, missing or invalid token
 *       500:
 *         description: Internal server error
 */
router.post('/games', validateGame, authMiddleware, requestTracking(gameController.createGame));

/**
 * @swagger
 * /api/v1/games:
 *   get:
 *     summary: Retrieve all games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier for the game
 *                   title:
 *                     type: string
 *                     description: Title of the game
 *                   maxPlayers:
 *                     type: integer
 *                     description: Maximum number of players allowed in the game
 *                   rules:
 *                     type: string
 *                     description: Game rules
 *       500:
 *         description: Internal server error
 */
router.get('/games', gameController.getGames);

/**
 * @swagger
 * /api/v1/games/{id}:
 *   get:
 *     summary: Retrieve a game by its ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the game
 *     responses:
 *       200:
 *         description: Successfully retrieved the game
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier for the game
 *                 title:
 *                   type: string
 *                   description: Title of the game
 *                 maxPlayers:
 *                   type: integer
 *                   description: Maximum number of players allowed in the game
 *                 rules:
 *                   type: string
 *                   description: Game rules
 *       404:
 *         description: Game not found
 *       500:
 *         description: Internal server error
 */
router.get('/games/:id', gameController.getGameById);

/**
 * @swagger
 * /api/v1/games/{id}:
 *   put:
 *     summary: Update a game by its ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the game
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the game
 *                 example: "UNOaaasssssssssssaaaE"
 *               maxPlayers:
 *                 type: integer
 *                 description: Maximum number of players allowed in the game
 *                 example: 22
 *               rules:
 *                 type: string
 *                 description: Game rules
 *                 example: "you cannot pick up cards"
 *             required:
 *               - title
 *               - maxPlayers
 *               - rules
 *     responses:
 *       200:
 *         description: Game updated successfully
 *       400:
 *         description: Invalid game data
 *       404:
 *         description: Game not found
 *       500:
 *         description: Internal server error
 */
router.put('/games/:id', validateGame, gameController.updateGame);

/**
 * @swagger
 * /api/v1/games/{id}:
 *   delete:
 *     summary: Delete a game by its ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the game
 *     responses:
 *       200:
 *         description: Game deleted successfully
 *       404:
 *         description: Game not found
 *       500:
 *         description: Internal server error
 */
router.delete('/games/:id', gameController.deleteGame);
router.post('/startGame', authMiddleware, requestTracking(gameController.startGame));
router.post('/finishGame', authMiddleware, requestTracking(gameController.finishGame));
router.get('/statusGame', requestTracking(gameController.getStatusGame));
router.get('/playersGame', requestTracking(gameController.getPlayersGame));
router.get('/nextPlayer', requestTracking(gameController.getNextPlayer));
router.post('/dealCards', requestTracking(gameController.dealCardsGame));
router.post('/playCard', authMiddleware, validatePlayCard, requestTracking(gameController.playCardUser));
router.post('/drewCardFromDeck', authMiddleware, validateDrawCard, requestTracking(gameController.pickUpCard));
router.post('/sayUno', authMiddleware, validateSayUno, requestTracking(gameController.sayUno));
router.post('/challengePlayer', authMiddleware, validateChallengePlayer, requestTracking(gameController.challengePlayer));
router.get('/getCardDiscardPile', authMiddleware, requestTracking(gameController.getCardDiscardPile));


export default router;
