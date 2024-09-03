import { Router } from "express";
import cardController from "../controllers/cardController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requestTracking } from "../middlewares/requestTracking/requestTracking.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: API for managing cards
 */

/**
 * @swagger
 * /api/v1/cards:
 *   post:
 *     summary: Create a new card entry
 *     tags: [Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               color:
 *                 type: string
 *                 description: Color of the card
 *                 example: "red"
 *               value:
 *                 type: string
 *                 description: Value of the card
 *                 example: "5"
 *               point:
 *                 type: integer
 *                 description: Points associated with the card
 *                 example: 10
 *             required:
 *               - color
 *               - value
 *               - point
 *     responses:
 *       201:
 *         description: Card entry created successfully
 *       400:
 *         description: Invalid card data
 *       500:
 *         description: Internal server error
 */
router.post('/cards', cardController.createCard);

/**
 * @swagger
 * /api/v1/cards:
 *   get:
 *     summary: Retrieve all card entries
 *     tags: [Cards]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier for the card
 *                   color:
 *                     type: string
 *                     description: Color of the card
 *                   value:
 *                     type: string
 *                     description: Value of the card
 *                   point:
 *                     type: integer
 *                     description: Points associated with the card
 *       500:
 *         description: Internal server error
 */
router.get('/cards', requestTracking(cardController.getCards));

/**
 * @swagger
 * /api/v1/cards/{id}:
 *   get:
 *     summary: Retrieve a card entry by its ID
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the card
 *     responses:
 *       200:
 *         description: Successfully retrieved the card entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier for the card
 *                 color:
 *                   type: string
 *                   description: Color of the card
 *                 value:
 *                   type: string
 *                   description: Value of the card
 *                 point:
 *                   type: integer
 *                   description: Points associated with the card
 *       404:
 *         description: Card entry not found
 *       500:
 *         description: Internal server error
 */
router.get('/cards/:id', cardController.getCardById);

/**
 * @swagger
 * /api/v1/cards/{id}:
 *   put:
 *     summary: Update a card entry by its ID
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the card
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               color:
 *                 type: string
 *                 description: Color of the card
 *                 example: "blue"
 *               value:
 *                 type: string
 *                 description: Value of the card
 *                 example: "10"
 *               point:
 *                 type: integer
 *                 description: Points associated with the card
 *                 example: 20
 *             required:
 *               - color
 *               - value
 *               - point
 *     responses:
 *       200:
 *         description: Card entry updated successfully
 *       400:
 *         description: Invalid card data
 *       404:
 *         description: Card entry not found
 *       500:
 *         description: Internal server error
 */
router.put('/cards/:id', cardController.updateCard);

/**
 * @swagger
 * /cards/{id}:
 *   delete:
 *     summary: Delete a card entry by its ID
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the card
 *     responses:
 *       200:
 *         description: Card entry deleted successfully
 *       404:
 *         description: Card entry not found
 *       500:
 *         description: Internal server error
 */
router.delete('/cards/:id', cardController.deleteCard);
router.get("/userCards", authMiddleware,requestTracking(cardController.userCardsUser));
router.get("/allUserWithCards", requestTracking(cardController.userAllCardsUsers));

export default router;
