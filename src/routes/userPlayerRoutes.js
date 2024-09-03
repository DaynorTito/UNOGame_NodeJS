import { Router } from 'express';
import userPlayerController from '../controllers/userPlayerController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requestTracking } from '../middlewares/requestTracking/requestTracking.js';
import { validateUser } from '../middlewares/payloadValidation/userPlayerSchemaValidation.js';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for manage user players
 */

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new UserPlayer
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPlayerRegister'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid user data
 */
router.post('/register', validateUser, requestTracking(userPlayerController.registerUserPlayer));

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve all UserPlayers
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User Player List
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserPlayer'
 */
router.get('/users', requestTracking(userPlayerController.getUserPlayers));

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get an User Player by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID User Player
 *     responses:
 *       200:
 *         description: Information User Player
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPlayer'
 *       404:
 *         description: User player not found
 */
router.get('/users/:id', userPlayerController.getUserPlayerById);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update an user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID User Player
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPlayerRegister'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid Data
 *       404:
 *         description: User not found
 */
router.put('/users/:id', validateUser, userPlayerController.updateUserPlayer);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete an user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID User Player
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/users/:id', userPlayerController.deleteUserPlayer);

/**
 * @swagger
 * /api/v1/infuser:
 *   get:
 *     summary: Get basic details information about an User Player
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User Player's basic details
 *       401:
 *         description: Not authorized
 */
router.get('/infuser', authMiddleware, requestTracking(userPlayerController.getBasicDetails));

export default router;
