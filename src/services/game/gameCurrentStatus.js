import playCard from "../cards/playCard.js";
import userCards from "../cards/userCards.js";
import userPlayerService from "../userPlayerService.js";
import gameStateService from "./gameStateService.js";
import turnHistoryGame from "./turnHistoryGame.js";


const getCurrentStatusGame =  async (gameId) => {
    const history = await turnHistoryGame.showHistoryGame(gameId);
    const hands = await userCards.getAllHandUserGame(gameId);
    const topCard = await playCard.getLastCard(gameId);
    const idNextPlayer = await gameStateService.getNextTurnService(gameId);
    const player = await userPlayerService.getUserPlayerByIdService(idNextPlayer);
    return {player: player.username , topCard, hands, history}
};


export default {
    getCurrentStatusGame
}



