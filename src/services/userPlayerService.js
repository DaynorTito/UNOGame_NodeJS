import { NotFoundError, AlreadyExistsError } from "../errors/customError.js";
import UserPlayer from "../models/userPlayer.js";


const registerUserPlayerService = async (userData) => {  
    const existingUser = await getUserPlayerByIdService(userData.id); 
    if (existingUser)
        throw new AlreadyExistsError('User already exists');
    return await UserPlayer.create(userData);
};

const getUserPlayersService = async () => {
    return await UserPlayer.findAll();
};

const getUserPlayerByIdService = async (id) => {
    return await UserPlayer.findByPk(id);
};

const updateUserPlayerService = async (id, updateData) => {
    const user = await UserPlayer.findByPk(id);
    if (user) {
        await user.update(updateData);
        return user;
    }
    throw new NotFoundError('UserPlayer not found');
};

const deleteUserPlayerService = async(id) => {
    const user = await UserPlayer.findByPk(id);
    if (user) {
        await user.destroy();
        return true;
    }
    throw new NotFoundError('UserPlayer not found');
};

const getUserPlayerByname = async (username) => {
    return await UserPlayer.findOne({where: {username}});
};


export default {
    registerUserPlayerService, 
    getUserPlayersService,
    getUserPlayerByIdService,
    updateUserPlayerService,
    deleteUserPlayerService,
    getUserPlayerByname
};