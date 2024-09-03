import { Router } from "express";
import attendeeController from "../controllers/attendeeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requestTracking } from "../middlewares/requestTracking/requestTracking.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Attendees
 *   description: API for managing attendees
 */

/**
 * @swagger
 * /api/v1/attendees:
 *   post:
 *     summary: Create a new attendee entry
 *     tags: [Attendees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user
 *                 example: "user123"
 *               gameId:
 *                 type: string
 *                 description: ID of the game
 *                 example: "game456"
 *               status:
 *                 type: string
 *                 description: Status of the attendee
 *                 example: "on hold"
 *               sayUno:
 *                 type: boolean
 *                 description: Whether the attendee has said "Uno"
 *                 example: false
 *               turn:
 *                 type: integer
 *                 description: Turn number of the attendee
 *                 example: 1
 *             required:
 *               - userId
 *               - gameId
 *     responses:
 *       201:
 *         description: Attendee entry created successfully
 *       400:
 *         description: Invalid attendee data
 *       500:
 *         description: Internal server error
 */
router.post('/attendees', authMiddleware, requestTracking(attendeeController.createAttendee));

/**
 * @swagger
 * /api/v1/leave:
 *   post:
 *     summary: Leave an attendee in progress
 *     tags: [Attendees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attendeeId:
 *                 type: string
 *                 description: ID of the attendee
 *                 example: "attendee789"
 *             required:
 *               - attendeeId
 *     responses:
 *       200:
 *         description: Attendee left in progress
 *       400:
 *         description: Invalid attendee ID
 *       500:
 *         description: Internal server error
 */
router.post('/leave', authMiddleware, requestTracking(attendeeController.leaveAttendeeInProgess));

/**
 * @swagger
 * /api/v1/attendees:
 *   get:
 *     summary: Retrieve all attendee entries
 *     tags: [Attendees]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of attendees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier for the attendee
 *                   userId:
 *                     type: string
 *                     description: ID of the user
 *                   gameId:
 *                     type: string
 *                     description: ID of the game
 *                   status:
 *                     type: string
 *                     description: Status of the attendee
 *                   sayUno:
 *                     type: boolean
 *                     description: Whether the attendee has said "Uno"
 *                   turn:
 *                     type: integer
 *                     description: Turn number of the attendee
 *       500:
 *         description: Internal server error
 */
router.get('/attendees', requestTracking(attendeeController.getAttendees));

/**
 * @swagger
 * /api/v1/attendees/{id}:
 *   get:
 *     summary: Retrieve an attendee entry by its ID
 *     tags: [Attendees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the attendee
 *     responses:
 *       200:
 *         description: Successfully retrieved the attendee entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier for the attendee
 *                 userId:
 *                   type: string
 *                   description: ID of the user
 *                 gameId:
 *                   type: string
 *                   description: ID of the game
 *                 status:
 *                   type: string
 *                   description: Status of the attendee
 *                 sayUno:
 *                   type: boolean
 *                   description: Whether the attendee has said "Uno"
 *                 turn:
 *                   type: integer
 *                   description: Turn number of the attendee
 *       404:
 *         description: Attendee entry not found
 *       500:
 *         description: Internal server error
 */
router.get('/attendees/:id', attendeeController.getAttendeeById);

/**
 * @swagger
 * /api/v1/attendees/{id}:
 *   put:
 *     summary: Update an attendee entry by its ID
 *     tags: [Attendees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the attendee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user
 *                 example: "user123"
 *               gameId:
 *                 type: string
 *                 description: ID of the game
 *                 example: "game456"
 *               status:
 *                 type: string
 *                 description: Status of the attendee
 *                 example: "active"
 *               sayUno:
 *                 type: boolean
 *                 description: Whether the attendee has said "Uno"
 *                 example: true
 *               turn:
 *                 type: integer
 *                 description: Turn number of the attendee
 *                 example: 2
 *             required:
 *               - userId
 *               - gameId
 *     responses:
 *       200:
 *         description: Attendee entry updated successfully
 *       400:
 *         description: Invalid attendee data
 *       404:
 *         description: Attendee entry not found
 *       500:
 *         description: Internal server error
 */
router.put('/attendees/:id', attendeeController.updateAttendee);

/**
 * @swagger
 * /api/v1/attendees/{id}:
 *   delete:
 *     summary: Delete an attendee entry by its ID
 *     tags: [Attendees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the attendee
 *     responses:
 *       200:
 *         description: Attendee entry deleted successfully
 *       404:
 *         description: Attendee entry not found
 *       500:
 *         description: Internal server error
 */
router.delete('/attendees/:id', attendeeController.deleteAttendee);

router.post('/attendeeReady', authMiddleware, requestTracking(attendeeController.userMarkAsReady));


export default router;