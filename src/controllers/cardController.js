import { 
    createCardService, 
    getCardsService, 
    getCardByIdService, 
    updateCardService, 
    deleteCardService
} from "../services/cardService.js";

const createCard = async (req, res, next) => {
    try {
        const card = await createCardService(req.body);
        res.status(201).json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCards =  async (req, res, next) => {
    try {
        const cards = await getCardsService();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCardById = async (req, res, next) => {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    try {
        const card = await getCardByIdService(numericId);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCard = async (req, res, next) => {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    try {
        const card = await updateCardService(numericId, req.body);
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCard = async (req, res, next) => {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    try {
        await deleteCardService(numericId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {createCard, getCards, getCardById, updateCard, deleteCard};