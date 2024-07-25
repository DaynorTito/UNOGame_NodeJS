import User from "../models/user.js";

const registerUserService = async (userData) => {
    return await User.create(userData);
};

const getUsersService = async () => {
    return await User.findAll();
};

const getUserByIdService = async (id) => {
    return await User.findByPk(id);
};

const updateUserService = async (id, updateData) => {
    const user = await User.findByPk(id);
    if (user) {
        await user.update(updateData);
        return user;
    }
    throw new Error('User not found');
};

const deleteUserService = async(id) => {
    const user = await User.findByPk(id);
    if (user) {
        await user.destroy();
        return true;
    }
    throw new Error('User not found');
};

const getUserByUsernameService = async (username) => {
    return await User.findOne({where: {username: username}});
};

export {registerUserService, 
        getUsersService,
        getUserByIdService,
        updateUserService,
        deleteUserService,
        getUserByUsernameService
};