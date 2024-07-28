import Game from "../models/game.js";

const createGameService = async (GameData, user) => {
    GameData.userCreatedId = user.id;
    return await Game.create(GameData);
};

const getGamesService = async () => {
    return await Game.findAll();
};

const getGameByIdService = async (id) => {
    return await Game.findByPk(id);
};

const updateGameService = async (id, updateData) => {
    const game = await Game.findByPk(id);
    if (game) {
        await game.update(updateData);
        return game;
    }
    throw new Error('Game not found');
};

const deleteGameService = async(id) => {
    const game = await Game.findByPk(id);
    if (game) {
        await game.destroy();
        return true;
    }
    throw new Error('Game not found');
};

export {createGameService, 
        getGamesService,
        getGameByIdService,
        updateGameService,
        deleteGameService
};