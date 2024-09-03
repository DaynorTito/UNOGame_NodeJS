import Joi from "joi";

export const challengePlayerSchema = Joi.object({
    gameId: Joi.string().guid({ version: ['uuidv4'] }).required(),
    challenger: Joi.string().alphanum().min(3).max(30).required(),
    challengedPlayer: Joi.string().alphanum().min(3).max(30).required()
});