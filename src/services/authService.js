import jwt from "jsonwebtoken";
import getUserPlayerByname from "./userPlayerService.js";

const validateToken = (bearerToken) => {
    const token = bearerToken.split(" ").at(1);
    return verifyToken(token);
}

export default {
    validateToken
};
