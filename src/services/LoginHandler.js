import jwt from "jsonwebtoken";

export class LoginHandler {

    userRepository = null;

    constructor (userRepository){
        this.userRepository = userRepository;
    }

    async login(username, password) {
        const user = this.userRepository.findUserByUserName(username);
        if(!user) {
            throw new Error('Inavid credentials');
        }
        const isPasswordValid = await this.userRepository.validateUserPassword(username, password);

        if(!isPasswordValid) {
            throw new Error('Inavid password');
        }
        const token = jwt.sign({id: user.id, username, email: user.email}, process.env.SECRET);
    
        return token;
    };

    verifyToken (token) {
        return jwt.verify(token, process.env.SECRET);;
    };

    async logout (token) {
        if (!this.verifyToken(token))
            return { message: 'Invalid token' };
        return { message: 'User logged out successfully' };
    };
}