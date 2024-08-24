import authService from '../services/authentication/authService.js';


export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      req.logger.warn('No token provided');
      return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
      const decoded = authService.validateToken(authHeader);
      req.user = decoded;
      req.logger.info('Token validated successfully', { username: decoded.username });
      next();
    } catch (error) {
      req.logger.error('Error verifying token', { error });
      return res.status(401).json({ error: 'Invalid token' });
    }
};