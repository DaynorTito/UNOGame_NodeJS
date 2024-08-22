import userPlayerService from '../services/userPlayerService.js';

const registerUserPlayer = async (req, res, next) => {
    try {
        const user = await userPlayerService.registerUserPlayerService(req.body);
        res.status(200).json({message: "User registered successfully", userId: user.id});
    } catch (error) {
        next(error);
    }
};

const getUserPlayers =  async (req, res, next) => {
    try {
        const users = await userPlayerService.getUserPlayersService();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const getUserPlayerById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await userPlayerService.getUserPlayerByIdService(id);
        if (!user)
            return res.status(404).json({ message: 'UserPlayer not found' });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const updateUserPlayer = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await userPlayerService.updateUserPlayerService(id, req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const deleteUserPlayer = async (req, res, next) => {
    const { id } = req.params;
    try {
        await userPlayerService.deleteUserPlayerService(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const getBasicDetails = async (req, res, next) => {
    try {
        const user = req.user;
        const {username, email} = await userPlayerService.getUserPlayerByIdService(user.id);
        res.status(200).json({username, email});
    } catch (error) {
        next(error);
    }
};

export default {
    getUserPlayers, 
    getUserPlayerById, 
    registerUserPlayer, 
    deleteUserPlayer, 
    updateUserPlayer, 
    getBasicDetails
};