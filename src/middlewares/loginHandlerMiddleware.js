import { UserMySqlRepository } from "../models/UserMySqlRepository.js";
import { LoginHandler } from "../services/LoginHandler.js";

export function authenticationMiddleware(req, res, next) {
    const userRepository = new UserMySqlRepository();
    const authenticationHandler = new LoginHandler(userRepository);

    req.authenticationHandler = authenticationHandler;

    next();
};
