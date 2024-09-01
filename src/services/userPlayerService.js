import { NotFoundError, AlreadyExistsError } from "../errors/customError.js";
import container from "../config/container.js"

const userPlayerRepository = container.resolve('userPlayerRepository');

const registerUserPlayerService = async (userData) => {  
    console.log(userData)
    const existingUser = await getUserPlayerByname(userData.username); 
    if (existingUser)
        throw new AlreadyExistsError('User already exists');
    return await userPlayerRepository.create(userData);
};

const getUserPlayersService = async () => {
    return await userPlayerRepository.findAll();
};

const getUserPlayerByIdService = async (id) => {
    return await userPlayerRepository.findById(id);
};

const updateUserPlayerService = async (id, updateData) => {
    const user = await userPlayerRepository.findById(id);
    if (user) {
        const updated = await userPlayerRepository.update(id, updateData);
        return updated;
    }
    throw new NotFoundError('UserPlayer not found');
};

const deleteUserPlayerService = async(id) => {
    const user = await userPlayerRepository.findById(id);
    if (user) {
        await userPlayerRepository.destroy(id);
        return true;
    }
    throw new NotFoundError('UserPlayer not found');
};

const getUserPlayerByname = async (username) => {
    return await userPlayerRepository.findOneByClause({username});
};


export default {
    registerUserPlayerService, 
    getUserPlayersService,
    getUserPlayerByIdService,
    updateUserPlayerService,
    deleteUserPlayerService,
    getUserPlayerByname
};