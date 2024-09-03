import { Router } from "express";
import discardsController from "../controllers/discardsController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Discards
 *   description: API for managing discarded cards
 */

/**
 * @swagger
 * /api/v1/discards:
 *   post:
 *     summary: Create a new discarded card entry
 *     tags: [Discards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gameId:
 *                 type: string
 *                 description: Unique identifier for the game
 *                 example: "game123"
 *               cardId:
 *                 type: string
 *                 description: Unique identifier for the card
 *                 example: "card456"
 *               userId:
 *                 type: string
 *                 description: Unique identifier for the user player
 *                 example: "user789"
 *               top:
 *                 type: boolean
 *                 description: Indicates if the card is on top
 *                 example: true
 *               state:
 *                 type: string
 *                 enum: [used, unused, in play]
 *                 description: Current state of the discarded card
 *                 example: "unused"
 *             required:
 *               - gameId
 *               - cardId
 *     responses:
 *       201:
 *         description: Discarded card entry created successfully
 *       400:
 *         description: Invalid discard card data
 *       500:
 *         description: Internal server error
 */
router.post('/discards', discardsController.createDiscardCard);

/**
 * @swagger
 * /api/v1/discards:
 *   get:
 *     summary: Retrieve all discarded cards
 *     tags: [Discards]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of discarded cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique identifier for the discard card entry
 *                   gameId:
 *                     type: string
 *                     description: Unique identifier for the game
 *                   cardId:
 *                     type: string
 *                     description: Unique identifier for the card
 *                   userId:
 *                     type: string
 *                     description: Unique identifier for the user player
 *                   top:
 *                     type: boolean
 *                     description: Indicates if the card is on top
 *                   state:
 *                     type: string
 *                     enum: [used, unused, in play]
 *                     description: Current state of the discarded card
 *       500:
 *         description: Internal server error
 */
router.get('/discards', discardsController.getDiscardCards);

/**
 * @swagger
 * /api/v1/discards/{id}:
 *   get:
 *     summary: Retrieve a discarded card entry by its ID
 *     tags: [Discards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier for the discarded card entry
 *     responses:
 *       200:
 *         description: Successfully retrieved the discard card entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique identifier for the discard card entry
 *                 gameId:
 *                   type: string
 *                   description: Unique identifier for the game
 *                 cardId:
 *                   type: string
 *                   description: Unique identifier for the card
 *                 userId:
 *                   type: string
 *                   description: Unique identifier for the user player
 *                 top:
 *                   type: boolean
 *                   description: Indicates if the card is on top
 *                 state:
 *                   type: string
 *                   enum: [used, unused, in play]
 *                   description: Current state of the discarded card
 *       404:
 *         description: Discarded card entry not found
 *       500:
 *         description: Internal server error
 */
router.get('/discards/:id', discardsController.getDiscardCardById);

/**
 * @swagger
 * /api/v1/discards/{id}:
 *   put:
 *     summary: Update a discarded card entry by its ID
 *     tags: [Discards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier for the discarded card entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gameId:
 *                 type: string
 *                 description: Unique identifier for the game
 *                 example: "game123"
 *               cardId:
 *                 type: string
 *                 description: Unique identifier for the card
 *                 example: "card456"
 *               userId:
 *                 type: string
 *                 description: Unique identifier for the user player
 *                 example: "user789"
 *               top:
 *                 type: boolean
 *                 description: Indicates if the card is on top
 *                 example: true
 *               state:
 *                 type: string
 *                 enum: [used, unused, in play]
 *                 description: Current state of the discarded card
 *                 example: "unused"
 *             required:
 *               - gameId
 *               - cardId
 *     responses:
 *       200:
 *         description: Discarded card entry updated successfully
 *       400:
 *         description: Invalid discard card data
 *       404:
 *         description: Discarded card entry not found
 *       500:
 *         description: Internal server error
 */
router.put('/discards/:id', discardsController.updateDiscardCard);

/**
 * @swagger
 * /api/v1/discards/{id}:
 *   delete:
 *     summary: Delete a discarded card entry by its ID
 *     tags: [Discards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier for the discarded card entry
 *     responses:
 *       200:
 *         description: Discarded card entry deleted successfully
 *       404:
 *         description: Discarded card entry not found
 *       500:
 *         description: Internal server error
 */
router.delete('/discards/:id', discardsController.deleteDiscardCard);

export default router;