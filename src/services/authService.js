import jwt from "jsonwebtoken";
import container from "../config/container.js";

const userPlayerRepository = container.resolve('loginHandler');

const login = async (username, password) =>{
    return await userPlayerRepository.login(username, password);
};

const logout = async (token) =>{
    return await userPlayerRepository.logout(token);
};
const validateToken = (bearerToken) => {
    const token = bearerToken.split(" ").at(1);
    return verifyToken(token);
}
const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET);;
};

export default {
    validateToken,
    verifyToken,
    login,
    logout
};
