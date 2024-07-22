import Player from "../models/player";

const createPlayerService = async (playerData) => {
    return await Player.create(playerData);
};

const getPlayersService = async () => {
    return await Player.findAll();
};

const getPlayerByIdService = async (id) => {
    return await Player.findByPk(id);
};

const updatePlayerService = async (id, updateData) => {
    const player = await Player.findByPk(id);
    if (player) {
        await player.update(updateData);
        return player;
    }
    throw new Error('Player not found');
};

const deletePlayerService = async(id) => {
    const player = await Player.findByPk(id);
    if (player) {
        await player.destroy();
        return true;
    }
    throw new Error('Player not found');
};

export {createPlayerService, 
        getPlayersService,
        getPlayerByIdService,
        updatePlayerService,
        deletePlayerService
};