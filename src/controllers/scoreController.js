import { createScoreService, 
    getScoresService, 
    getScoreByIdService, 
    updateScoreService, 
    deleteScoreService
} from "../services/scoreService.js";

const createScore = async (req, res, next) => {
    try {
        const score = await createScoreService(req.body);
        res.status(201).json(score);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getScores =  async (req, res, next) => {
    try {
        const scores = await getScoresService();
        res.status(200).json(scores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getScoreById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const score = await getScoreByIdService(id);
        if (!score) {
            return res.status(404).json({ message: 'Score not found' });
        }
        res.status(200).json(score);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateScore = async (req, res, next) => {
    const { id } = req.params;
    try {
        const score = await updateScoreService(id, req.body);
        res.status(200).json(score);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteScore = async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteScoreService(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {createScore, getScores, getScoreById, updateScore, deleteScore};