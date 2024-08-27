import container from "../config/container.js";
import { ValidationError } from "../errors/customError.js";

const cardRepository = container.resolve('cardRepository');

export const convertToCardObject = (cardString) => {
    const parts = cardString.trim().split(/\s+/);
    if (parts.length < 2)
      throw new ValidationError("Invalid card format, enter card followin: Color Value");
    const [color, ...valueParts] = parts;
    const value = valueParts.join(' ');
    return { color, value: isNaN(value) ? value : String(value)};
  };

export const getCardDescription = async (idCard) => {
    const infoCard = await cardRepository.findById(idCard);
    return infoCard;
};

export const getCardListDescription = async (discardList) => {
    const getCardIds = (list) => list.map(item => item.cardId);
    const getDescriptions = (ids) => ids.map(getCardDescription);
    const cardIds = getCardIds(discardList);
    const cardPromises = getDescriptions(cardIds);
    return Promise.all(cardPromises);
};
