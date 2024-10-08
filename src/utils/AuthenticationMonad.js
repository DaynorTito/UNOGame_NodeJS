import { UnauthorizedError } from "../errors/customError.js";
import jwt from "jsonwebtoken";

class AuthenticationMonad {
  constructor(token, decoded = null) {
    this.token = token;
    this.decoded = decoded;
  }

  static of(token) {
    return new AuthenticationMonad(token);
  }

  flatMap(fn) {
    try {
      return fn(this);
    } catch (error) {
      throw error;
    }
  }

  checkTokenExistence() {
    return this.flatMap((monad) => {
      if (!monad.token) {
        throw new UnauthorizedError("Token not provided.");
      }
      return monad;
    });
  }

  validateToken() {
    return this.flatMap((monad) => {
      try {
        monad.decoded = jwt.verify(monad.token, process.env.SECRET);
        return monad;
      } catch (error) {
        throw new UnauthorizedError("Invalid or expired token.");
      }
    });
  }

  getResult() {
    return { token: this.token, decoded: this.decoded };
  }
}

export default AuthenticationMonad;
