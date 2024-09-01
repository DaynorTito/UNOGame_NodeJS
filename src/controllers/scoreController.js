import scoreService from "../services/scoreService.js";
import calculateScores from "../services/scores/calculateScores.js";

const createScore = async (req, res, next) => {
    try {
        const score = await scoreService.createScoreService(req.body);
        res.status(201).json(score);
    } catch (error) {
        next(error);
    }
};

const getScores =  async (req, res, next) => {
    try {
        const scores = await scoreService.getScoresService();
        res.status(200).json(scores);
    } catch (error) {
        next(error);
    }
};

const getScoreById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const score = await scoreService.getScoreByIdService(id);
        if (!score) {
            return res.status(404).json({ message: 'Score not found' });
        }
        res.status(200).json(score);
    } catch (error) {
        next(error);
    }
};

const updateScore = async (req, res, next) => {
    const { id } = req.params;
    try {
        const score = await scoreService.updateScoreService(id, req.body);
        res.status(200).json(score);
    } catch (error) {
        next(error);
    }
};

const deleteScore = async (req, res, next) => {
    const { id } = req.params;
    try {
        await scoreService.deleteScoreService(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const getPlayersScores = async (req, res, next) => {
    const { gameId } = req.body;
    try {
        const scores = await calculateScores.getPlayersScores(gameId);
        res.status(200).json({scores:scores });
    } catch (error) {
        next(error);
    }
};

export default {
    createScore, 
    getScores, 
    getScoreById, 
    updateScore, 
    deleteScore,
    getPlayersScores
};