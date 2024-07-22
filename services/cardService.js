import Card from "../models/card";

const createCardService = async (cardData) => {
    return await Card.create(cardData);
};

const getCardsService = async () => {
    return await Card.findAll();
};

const getCardByIdService = async (id) => {
    return await Card.findByPk(id);
};

const updateCardService = async (id, updateData) => {
    const card = await Card.findByPk(id);
    if (card) {
        await card.update(updateData);
        return card;
    }
    throw new Error('Card not found');
};

const deleteCardService = async(id) => {
    const card = await Card.findByPk(id);
    if (card) {
        await card.destroy();
        return true;
    }
    throw new Error('Card not found');
};

export {createCardService, 
    getCardsService,
    getCardByIdService,
    updateCardService,
    deleteCardService
};
