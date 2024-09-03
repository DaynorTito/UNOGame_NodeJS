import Joi from "joi";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *   schemas:
 *     UserPlayerRegister:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: "A unique username to identify the player."
 *           example: "username2"
 *         email:
 *           type: string
 *           description: "The user's email address. Must be unique and valid."
 *           example: "user@gmail.com"
 *         age:
 *           type: integer
 *           description: "The age of the user. This field is optional and can be null."
 *           example: 2
 *         password:
 *           type: string
 *           description: "The user's password. It should be hashed before storage."
 *           example: "user"
 *       required:
 *         - username
 *         - email
 *         - password
 *       additionalProperties: false
 */

export const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(18).max(100).required(),
    password: Joi.string().min(5).required()
});
