import { registerUserService, deleteUserService, getUserByIdService, getUsersService, updateUserService } from '../services/userService.js';

const registerUser = async (req, res, next) => {
    try {
        const user = await registerUserService(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsers =  async (req, res, next) => {
    try {
        const users = await getUsersService();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await getUserByIdService(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await updateUserService(id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteUserService(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {getUsers, getUserById, registerUser, deleteUser, updateUser};