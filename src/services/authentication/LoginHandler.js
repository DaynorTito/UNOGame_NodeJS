import jwt from "jsonwebtoken";
import { UnauthorizedError, ValidationError } from "../../errors/customError.js";
export class LoginHandler {

    constructor ({userPlayerRepository}){
        this.userRepository = userPlayerRepository;
    }

    async login(username, password) {
        const user = await this.userRepository.findOneByClause({username: username});
        if(!user) {
            throw new UnauthorizedError('Inavid credentials');
        }
        const isPasswordValid = await this.validateUserPassword(username, password);

        if(!isPasswordValid) {
            throw new UnauthorizedError('Inavid password');
        }
        const token = jwt.sign({id: user.id, username, email: user.email}, process.env.SECRET);
        return token;
    };

    verifyToken (token) {
        return jwt.verify(token, process.env.SECRET);;
    };

    async validateUserPassword (username, password) {
        const isPasswordValid = (await this.userRepository.findOneByClause({ username })).comparePassword(password);
        return isPasswordValid;
    }

    async logout (token) {
        if (!this.verifyToken(token))
            return { message: 'Invalid token' };
        return { message: 'User logged out successfully' };
    };
}
