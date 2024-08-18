import DiscardCard from "../models/discardCard.js";
import Card from "../models/card.js";
import { CardStatus } from "../utils/cardStatus.js";

const createDiscardCardService = async (cardData) => {
    return await DiscardCard.create(cardData);
};

const getDiscardCardsService = async () => {
    return await DiscardCard.findAll();
};

const getDiscardCardByIdService = async (id) => {
    return await DiscardCard.findByPk(id);
};

const updateDiscardCardService = async (id, updateData) => {
    const card = await DiscardCard.findByPk(id);
    if (card) {
        await card.update(updateData);
        return card;
    }
    throw new Error('DiscardCard not found');
};
 
const startPileDiscards = async (idGame) => {
    try {
        const cards = await Card.findAll();
        const discardCardEntries = cards.map(card => ({ gameId: idGame, cardId: card.id }));
        await DiscardCard.bulkCreate(discardCardEntries);
    } catch (error) {
        throw new Error('Error when adding cards to the game');
    }
};

const deleteDiscardCardService = async(id) => {
    const card = await DiscardCard.findByPk(id);
    if (card) {
        await card.destroy();
        return true;
    }
    throw new Error('DiscardCard not found');
};

const getRandomNumber = (lastNum) => {
    return Math.floor(Math.random() * lastNum) + 1;
};

const getLastCard = async (idGame) => {
    const randomId = getRandomNumber(108);
    const card = await DiscardCard.findByPk(randomId);

    if (card) {
        if (card.status === CardStatus.UNUSED) {
            return card;
        } else {
            return { message: 'Card is already used, try another one.' };
        }
    } else {
        return { message: 'Card not found.' };
    }
};

export {createDiscardCardService, 
    getDiscardCardsService,
    getDiscardCardByIdService,
    updateDiscardCardService,
    deleteDiscardCardService,
    startPileDiscards,
    getLastCard
};
