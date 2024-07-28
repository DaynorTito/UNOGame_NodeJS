import jwt from "jsonwebtoken";
import { getUserPlayerByname } from "./userPlayerService.js";



const login =  async (username, password) => {
    const user = await getUserPlayerByname(username);
    
    if(!user) {
        throw new Error('Inavid credentials');
    }
    const isPasswordValid =  await user.comparePassword(password);
    if(!isPasswordValid) {
        throw new Error('Inavid password');
    }
    const token = jwt.sign({id: user.id, username, email: user.email}, process.env.SECRET);

    return token;
};

const logout = (token) => {
    if (!verifyToken(token))
        return { message: 'Invalid token' };
    return { message: 'User logged out successfully' };
};

const validateToken = (bearerToken) => {
    const token = bearerToken.split(" ").at(1);
    return verifyToken(token);
}
 
const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET);;
}

export {login, validateToken, logout};
