import { 
    createDiscardCardService, 
    getDiscardCardsService, 
    getDiscardCardByIdService, 
    updateDiscardCardService, 
    deleteDiscardCardService
} from "../services/discardCardService.js";

const createDiscardCard = async (req, res, next) => {
    try {
        const card = await createDiscardCardService(req.body);
        res.status(201).json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDiscardCards =  async (req, res, next) => {
    try {
        const cards = await getDiscardCardsService();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDiscardCardById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const card = await getDiscardCardByIdService(id);
        if (!card) {
            return res.status(404).json({ message: 'DiscardCard not found' });
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDiscardCard = async (req, res, next) => {
    const { id } = req.params;
    try {
        const card = await updateDiscardCardService(id, req.body);
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDiscardCard = async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteDiscardCardService(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export {createDiscardCard, getDiscardCards, getDiscardCardById, updateDiscardCard, deleteDiscardCard};