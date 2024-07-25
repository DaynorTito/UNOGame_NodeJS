import jwt from "jsonwebtoken";
import { getUserByUsernameService } from "./userService.js";



const login =  async (username, password) => {
    const user = await getUserByUsernameService(username);
    
    if(!user) {
        throw new Error('Inavid credentials');
    }
    const isPasswordValid =  await user.comparePassword(password);
    if(!isPasswordValid) {
        throw new Error('Inavid password');
    }
    const token = jwt.sign({username, email: user.email}, process.env.SECRET);

    return token;
};

const logout = () => {
    // Invaidate token in client
    return { message: 'User logged out successfully' };
};

const validateToken = (bearerToken) => {
    const token = bearerToken.split(" ").at(1);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    return decodedToken;
}

export {login, validateToken, logout};
