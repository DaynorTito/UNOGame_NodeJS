import turnHistoryGame from "../services/game/turnHistoryGame.js";

const getHistoryGame = async (req, res, next) => {
    const { gameId } = req.body;
    try {
        const gameState = await turnHistoryGame.showHistoryGame(gameId);
        res.status(200).json({gameId, history: gameState});
    } catch (error) {
        next(error);
    }
};

export default {
    getHistoryGame
}