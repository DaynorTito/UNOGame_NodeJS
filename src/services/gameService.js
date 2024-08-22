import { ValidationError } from "../errors/customError.js";
import container from "../config/container.js"

const gameRepository = container.resolve('gameRepository');

const createGameService = async (GameData, user) => {
    GameData.userCreatedId = user.id;
    if (!GameData.userCreatedId)
        throw new ValidationError('You must provide a valid token access');
    return await gameRepository.create(GameData);
};

const getGamesService = async () => {
    return await gameRepository.findAll();
};

const getGameByIdService = async (id) => {
    const game = await gameRepository.findById(id);
    if (!game)
        throw new ValidationError('Game does not exist');
    return game;
};

const updateGameService = async (id, updateData) => {
    const game = await gameRepository.findById(id);
    if (game) {
        await gameRepository.update(id, updateData);
        return game;
    }
    throw new Error('Game not found');
};

const deleteGameService = async(id) => {
    const game = await gameRepository.findById(id);
    if (game) {
        await gameRepository.delete(id);
        return true;
    }
    throw new Error('Game not found');
};

export default {
    createGameService, 
    getGamesService,
    getGameByIdService,
    updateGameService,
    deleteGameService
};