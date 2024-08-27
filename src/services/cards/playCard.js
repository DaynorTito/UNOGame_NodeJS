import container from "../../config/container.js";
import { ValidationError } from "../../errors/customError.js";
import { GameStatus } from "../../utils/gameStatus.js";

const gameRepository = container.resolve('gameRepository');
const cardRepository = container.resolve('cardRepository');
const attendeeRepository = container.resolve('attendeeRepository');
const discardCards = container.resolve('discardCardRepository'); 
const userPlayerRepository = container.resolve('userPlayerRepository'); 



const playCardPlayer = () => {
    const topCard = discardCards.findOneByClause({top: true});
    if (!topCard)
        throw new ValidationError("Must deal the cards first");

};




