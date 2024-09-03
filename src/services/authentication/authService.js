import jwt from "jsonwebtoken";
import container from "../../config/container.js";
import { UnauthorizedError } from "../../errors/customError.js";
import AuthenticationMonad from "../../utils/AuthenticationMonad.js";

const userPlayerRepository = container.resolve("loginHandler");
const blacklistedTokens = new Set();

const login = async (username, password) => {
  return await userPlayerRepository.login(username, password);
};

const logout = async (token) => {
  const validationMonad = AuthenticationMonad.of(token)
    .checkTokenExistence()
    .validateToken()
    .getResult();

  if (blacklistedTokens.has(validationMonad.token)) {
    return { message: "User already logged out or token invalid" };
  }

  blacklistedTokens.add(validationMonad.token);
  return { message: "User logged out successfully" };
};

const validateToken = (bearerToken) => {
  const token = parseToken(bearerToken);
  const validationMonad = AuthenticationMonad.of(token)
    .checkTokenExistence()
    .validateToken()
    .getResult();

  if (blacklistedTokens.has(validationMonad.token)) {
    throw new UnauthorizedError("Token has been invalidated.");
  }

  return validationMonad.decoded;
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET);
};

const parseToken = (bearerToken) => {
  const parts = bearerToken.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new UnauthorizedError("Malformed token.");
  }
  return parts[1];
};

export default {
  validateToken,
  verifyToken,
  login,
  logout,
};
