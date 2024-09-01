import container from "../../config/container.js";
import { ValidationError } from "../../errors/customError.js";

const discardCards = container.resolve('discardCardRepository');

export const VarifyTopCard = async (gameId) => {
    const existTopCard = await discardCards.findOneByClause({top: true, gameId});
    if (!existTopCard) 
        throw new ValidationError("Must deal the cards first");
};
