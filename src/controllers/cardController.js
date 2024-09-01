import cardService from "../services/cardService.js";
import userCards from "../services/cards/userCards.js";

const createCard = async (req, res, next) => {
    try {
        const card = await cardService.createCardService(req.body);
        res.status(201).json(card);
    } catch (error) {
        next(error);
    }
};

const getCards =  async (req, res, next) => {
    try {
        const cards = await cardService.getCardsService();
        res.status(200).json(cards);
    } catch (error) {
        next(error);
    }
};

const getCardById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const card = await cardService.getCardByIdService(id);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(card);
    } catch (error) {
        next(error);
    }
};

const updateCard = async (req, res, next) => {
    const { id } = req.params;
    try {
        const card = await cardService.updateCardService(id, req.body);
        res.status(200).json(card);
    } catch (error) {
        next(error);
    }
};

const deleteCard = async (req, res, next) => {
    const { id } = req.params;
    try {
        await cardService.deleteCardService(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const userCardsUser = async (req, res, next) => {
    const { player, gameId } = req.body;
    const user = req.user;
    try {
        const cards = await userCards.getUserCards(player, gameId, user);
        res.status(200).json({player, hand: cards});
    } catch (error) {
        next(error);
    }
};

const userAllCardsUsers = async (req, res, next) => {
    const { gameId } = req.body;
    try {
        const cards = await userCards.getAllHandUserGame(gameId);
        res.status(200).json({hands: cards});
    } catch (error) {
        next(error);
    }
};

export default {
    createCard, 
    getCards, 
    getCardById, 
    updateCard, 
    deleteCard,
    userCardsUser,
    userAllCardsUsers
};
