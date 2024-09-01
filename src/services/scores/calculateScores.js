import { getCardsOfUserPlay } from "../../utils/userPlayersCards.js";
import gameStateService from "../game/gameStateService.js";
import informationAttendee from "../attendees/informationAttendee.js";

const getPlayersScores = async (gameId) => {
    const players = await gameStateService.getPlayersService(gameId);
    const userPlayers = await informationAttendee.getUserPlayers(players);
    return await calculatePoints(userPlayers, gameId);
};

const calculatePoints = async (players, gameId) => {  
    const scoresArray = await Promise.all(
        players.map(player => calculatePointsOneUser(player.id, gameId, player.username))
    );
    return scoresArray;
};

const calculatePointsOneUser = async (idUser, gameId, username) => {
    const cardsUser = await getCardsOfUserPlay(idUser, gameId);
    const score = calculatePlayerScore(cardsUser);
    return {username, score };
};

const calculatePlayerScore = (cards) => {
    return cards.reduce((total, card) => total + card.point, 0);
};

const thereIsWinner = async (gameId) => {
    const scoresArray = await getPlayersScores(gameId);
    const winner = scoresArray.find(({ score }) => score === 0);
    if (winner) {
        const { username } = winner;
        return { message: `${username} has won the game!`, scoresArray };
    }   
};

export default {
    getPlayersScores,
    thereIsWinner
}
