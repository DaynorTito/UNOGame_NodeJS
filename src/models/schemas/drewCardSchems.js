import Joi from "joi";


export const drawCardSchema = Joi.object({
    gameId: Joi.string().guid({ version: ['uuidv4'] }).required(),
    player: Joi.string().alphanum().min(3).max(30).required()
});