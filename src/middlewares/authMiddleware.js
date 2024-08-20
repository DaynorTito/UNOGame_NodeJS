import jwt from 'jsonwebtoken';
import validateToken from '../services/authService.js';


export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
      const decoded = validateToken(authHeader);
      req.user = decoded;
      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(401).json({ error: 'Invalid token' });
    }
};