import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../errors/customError.js";

export class LoginHandler {
  constructor({ userPlayerRepository }) {
    this.userRepository = userPlayerRepository;
  }

  async login(username, password) {
    const user = await this.userRepository.findOneByClause({
      username: username,
    });
    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const isPasswordValid = await this.validateUserPassword(username, password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, username, email: user.email },
      process.env.SECRET
    );
    return token;
  }

  async validateUserPassword(username, password) {
    const isPasswordValid = (
      await this.userRepository.findOneByClause({ username })
    ).comparePassword(password);
    return isPasswordValid;
  }

  verifyToken(token) {
    return jwt.verify(token, process.env.SECRET);
  }
}
