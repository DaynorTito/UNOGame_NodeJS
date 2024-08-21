import container from "../config/container.js"

const cardRepository = container.resolve('cardRepository');

const createCardService = async (cardData) => {
    return await cardRepository.create(cardData);
};

const getCardsService = async () => {
    return await cardRepository.findAll();
};

const getCardByIdService = async (id) => {
    return await cardRepository.findById(id);
};

const updateCardService = async (id, updateData) => {
    const card = await cardRepository.findById(id);
    if (card) {
        await cardRepository.update(id, updateData);
        return card;
    }
    throw new Error('Card not found');
};

const deleteCardService = async(id) => {
    const card = await cardRepository.findById(id);
    if (card) {
        await cardRepository.delete(id);
        return true;
    }
    throw new Error('Card not found');
};

export default {
    createCardService, 
    getCardsService,
    getCardByIdService,
    updateCardService,
    deleteCardService
};
