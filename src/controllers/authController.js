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

const logoutUser = (req, res, next) => {
    const response = logoutUser();
    res.json(response);
};

export {loginUser, logoutUser}