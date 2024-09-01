import container from "../../config/container.js";
import { userExistGame, validateGameInProgress } from "../validations/gameValidationService.js";
import { ActionValues } from "../../utils/actionValues.js"

const historyRepository = container.resolve('historyRepository');

const registerMove = async (gameId, action, player) => {
    await validateGameInProgress(gameId);
    await userExistGame(player, gameId);
    await validateAction(action);
    const logRegister = { player, action, gameId };
    return await historyRepository.create(logRegister);
};

const validateAction = (action) => {
    if (action !== ActionValues.DREW_CARD && !action.includes(ActionValues.PLAY_CARD))
        throw new ValidationError("Invalid action to register");
};

export default {
    registerMove
}