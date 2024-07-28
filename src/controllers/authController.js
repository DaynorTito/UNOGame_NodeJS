import {login, logout} from '../services/authService.js';

const loginUser = async(req, res, next) => {
    const {username, password} = req.body;
    try {
        const token = await login(username, password);
        res.status(200).json({access_token: token});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const logoutUser = async (req, res, next) => {
    const { access_token } = req.body;
    
    if (!access_token)
      return res.status(400).json({ error: 'Access token is required' });
  
    try {
      const response = await logout(access_token);
      res.json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  };

export {loginUser, logoutUser}