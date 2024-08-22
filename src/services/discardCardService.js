import { CardStatus } from "../utils/cardStatus.js";
import container from "../config/container.js"

const discardCardRepository = container.resolve('discardCardRepository');
const cardRepository = container.resolve('cardRepository');

const createDiscardCardService = async (cardData) => {
    return await discardCardRepository.create(cardData);
};

const getDiscardCardsService = async () => {
    return await discardCardRepository.findAll();
};

const getDiscardCardByIdService = async (id) => {
    return await discardCardRepository.findById(id);
};

const updateDiscardCardService = async (id, updateData) => {
    const card = await discardCardRepository.findById(id);
    if (card) {
        await discardCardRepository.update(id, updateData);
        return card;
    }
    throw new Error('DiscardCard not found');
};
 
const deleteDiscardCardService = async(id) => {
    const card = await discardCardRepository.findById(id);
    if (card) {
        await discardCardRepository.delete(id);
        return true;
    }
    throw new Error('DiscardCard not found');
};

const startPileDiscards = async (idGame) => {
    try {
        const cards = await cardRepository.findAll();
        const discardCardEntries = cards.map(card => ({ gameId: idGame, cardId: card.id }));
        await discardCardRepository.bulkCreate(discardCardEntries);
    } catch (error) {
        console.log(error)
    }
};

const getRandomNumber = (lastNum) => {
    return Math.floor(Math.random() * lastNum) + 1;
};

const getLastCard = async (idGame) => {
    const randomId = getRandomNumber(108);
    const card = await discardCardRepository.findById(randomId);
    
    if (card) {
        if (card.status === CardStatus.UNUSED) {
            return card;
        } else {
            return { message: 'Card is already used, try another one.', idGame };
        }
    } else {
        return { message: 'Card not found.' };
    }
};

export default {
    createDiscardCardService, 
    getDiscardCardsService,
    getDiscardCardByIdService,
    updateDiscardCardService,
    deleteDiscardCardService,
    startPileDiscards,
    getLastCard
};
