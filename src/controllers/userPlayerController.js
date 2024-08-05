import { registerUserPlayerService, deleteUserPlayerService, getUserPlayerByIdService, getUserPlayersService, updateUserPlayerService } from '../services/userPlayerService.js';

const registerUserPlayer = async (req, res, next) => {
    try {
        const user = await registerUserPlayerService(req.body);
        res.status(200).json({message: "User registered successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserPlayers =  async (req, res, next) => {
    try {
        const users = await getUserPlayersService();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserPlayerById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await getUserPlayerByIdService(id);
        if (!user)
            return res.status(404).json({ message: 'UserPlayer not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserPlayer = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await updateUserPlayerService(id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUserPlayer = async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteUserPlayerService(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBasicDetails = async (req, res, next) => {
    try {
        const user = req.user;
        const {username, email} = await getUserPlayerByIdService(user.id);
        res.status(200).json({username, email});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {getUserPlayers, getUserPlayerById, registerUserPlayer, deleteUserPlayer, updateUserPlayer, getBasicDetails};