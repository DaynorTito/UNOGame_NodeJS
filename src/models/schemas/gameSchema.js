import Joi from "joi";

export const gameSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    maxPlayers: Joi.number().integer().min(2).max(10).required(),
    rules: Joi.string().max(255).required()
});