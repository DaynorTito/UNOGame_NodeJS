import Score from "../models/score.js";

const createScoreService = async (ScoreData) => {
    return await Score.create(ScoreData);
};

const getScoresService = async () => {
    return await Score.findAll();
};

const getScoreByIdService = async (id) => {
    return await Score.findByPk(id);
};

const updateScoreService = async (id, updateData) => {
    const score = await Score.findByPk(id);
    if (score) {
        await score.update(updateData);
        return score;
    }
    throw new Error('Score not found');
};

const deleteScoreService = async(id) => {
    const score = await Score.findByPk(id);
    if (score) {
        await score.destroy();
        return true;
    }
    throw new Error('Score not found');
};

export {createScoreService, 
        getScoresService,
        getScoreByIdService,
        updateScoreService,
        deleteScoreService
};