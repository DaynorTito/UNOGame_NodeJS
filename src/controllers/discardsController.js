import discardCardService from "../services/discardCardService.js";

const createDiscardCard = async (req, res, next) => {
    try {
        const card = await discardCardService.createDiscardCardService(req.body);
        res.status(201).json(card);
    } catch (error) {
        next(error);
    }
};

const getDiscardCards =  async (req, res, next) => {
    try {
        const cards = await discardCardService.getDiscardCardsService();
        res.status(200).json(cards);
    } catch (error) {
        next(error);
    }
};

const getDiscardCardById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const card = await discardCardService.getDiscardCardByIdService(id);
        if (!card) {
            return res.status(404).json({ message: 'DiscardCard not found' });
        }
        res.status(200).json(card);
    } catch (error) {
        next(error);
    }
};

const updateDiscardCard = async (req, res, next) => {
    const { id } = req.params;
    try {
        const card = await discardCardService.updateDiscardCardService(id, req.body);
        res.status(200).json(card);
    } catch (error) {
        next(error);
    }
};

const deleteDiscardCard = async (req, res, next) => {
    const { id } = req.params;
    try {
        await discardCardService.deleteDiscardCardService(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};



export default {
    createDiscardCard, 
    getDiscardCards, 
    getDiscardCardById, 
    updateDiscardCard, 
    deleteDiscardCard
};