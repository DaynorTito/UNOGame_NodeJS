import container from "../config/container.js"

const scoreRepository = container.resolve('scoreRepository');


const createScoreService = async (ScoreData) => {
    return await scoreRepository.create(ScoreData);
};

const getScoresService = async () => {
    return await scoreRepository.findAll();
};

const getScoreByIdService = async (id) => {
    return await scoreRepository.findById(id);
};

const updateScoreService = async (id, updateData) => {
    const score = await scoreRepository.findById(id);
    if (score) {
        await scoreRepository.update(id, updateData);
        return score;
    }
    throw new Error('Score not found');
};

const deleteScoreService = async(id) => {
    const score = await scoreRepository.findById(id);
    if (score) {
        await scoreRepository.delete(id);
        return true;
    }
    throw new Error('Score not found');
};

export default {
    createScoreService, 
    getScoresService,
    getScoreByIdService,
    updateScoreService,
    deleteScoreService
};