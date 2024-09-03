import { Router } from "express";
import authController from "../controllers/authController.js";
import { requestTracking } from "../middlewares/requestTracking/requestTracking.js";
import { validateLogin } from "../middlewares/payloadValidation/loginUserSchemaValidation.js";

const router = Router();

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Authenticate a user and get a token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: "username of the user."
 *                 example: "username"
 *               password:
 *                 type: string
 *                 description: "The password of the user."
 *                 example: "userpassword"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successfully authenticated and token provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: "JWT token for authenticated access."
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTI1Nzg5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *       401:
 *         description: Invalid credentials
 *       400:
 *         description: Bad request, validation errors
 */
router.post("/login", validateLogin, requestTracking(authController.loginUser));

/**
 * @swagger
 * /api/v1/logout:
 *   post:
 *     summary: Logout a user and invalidate the token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               access_token:
 *                 type: string
 *                 description: "token"

 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Not authorized or invalid token
 */
router.post("/logout", requestTracking(authController.logoutUser));

export default router;
