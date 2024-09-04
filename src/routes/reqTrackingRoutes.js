import { Router } from "express";
import reqTrackingController from "../controllers/reqTrackingController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Request Tracking
 *   description: API for tracking various request metrics
 */

/**
 * @swagger
 * /stats/requests:
 *   get:
 *     summary: Retrieve the current states of all tracked requests
 *     tags: [Request Tracking]
 *     responses:
 *       200:
 *         description: Successfully retrieved the states of all tracked requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_requests:
 *                   type: integer
 *                   description: Total number of requests
 *                 breakdown:
 *                   type: object
 *                   additionalProperties:
 *                     type: object
 *                     properties:
 *                       GET:
 *                         type: integer
 *                         description: Number of GET requests to the endpoint
 *                       POST:
 *                         type: integer
 *                         description: Number of POST requests to the endpoint
 *                       PUT:
 *                         type: integer
 *                         description: Number of PUT requests to the endpoint
 *                       DELETE:
 *                         type: integer
 *                         description: Number of DELETE requests to the endpoint
 *       500:
 *         description: Internal server error
 */
router.get('/requests', reqTrackingController.statesRequest);

/**
 * @swagger
 * /stats/response-times:
 *   get:
 *     summary: Retrieve response times for all tracked requests
 *     tags: [Request Tracking]
 *     responses:
 *       200:
 *         description: Successfully retrieved response times for tracked requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: object
 *                 properties:
 *                   avg:
 *                     type: number
 *                     format: float
 *                     description: Average response time in milliseconds
 *                   min:
 *                     type: number
 *                     format: float
 *                     description: Minimum response time in milliseconds
 *                   max:
 *                     type: number
 *                     format: float
 *                     description: Maximum response time in milliseconds
 *       500:
 *         description: Internal server error
 */
router.get('/response-times', reqTrackingController.responseTime);

/**
 * @swagger
 * /stats/status-codes:
 *   get:
 *     summary: Retrieve the status codes of all tracked requests
 *     tags: [Request Tracking]
 *     responses:
 *       200:
 *         description: Successfully retrieved status codes for tracked requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 200:
 *                   type: integer
 *                   description: Number of 200 OK responses
 *                 201:
 *                   type: integer
 *                   description: Number of 201 Created responses
 *                 304:
 *                   type: integer
 *                   description: Number of 304 Not Modified responses
 *                 400:
 *                   type: integer
 *                   description: Number of 400 Bad Request responses
 *                 401:
 *                   type: integer
 *                   description: Number of 401 Unauthorized responses
 *                 409:
 *                   type: integer
 *                   description: Number of 409 Conflict responses
 *                 500:
 *                   type: integer
 *                   description: Number of 500 Internal Server Error responses
 *       500:
 *         description: Internal server error
 */
router.get('/status-codes', reqTrackingController.statusCodes);

/**
 * @swagger
 * /stats/popular-endpoints:
 *   get:
 *     summary: Retrieve the most popular endpoints based on request count
 *     tags: [Request Tracking]
 *     responses:
 *       200:
 *         description: Successfully retrieved popular endpoints based on request count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 most_popular:
 *                   type: string
 *                   description: The most popular endpoint URL
 *                 request_count:
 *                   type: integer
 *                   description: Number of requests to the most popular endpoint
 *       500:
 *         description: Internal server error
 */
router.get('/popular-endpoints', reqTrackingController.popularEndpoint);

export default router;
