import Joi from 'joi';

export const playCardSchema = Joi.object({
    gameId: Joi.string().guid({ version: ['uuidv4'] }).required(),
    player: Joi.string().alphanum().min(3).max(30).required(),
    cardPlayed: Joi.string().pattern(/^(Red|Green|Blue|Yellow) (0|[1-9]|10|Reverse|Skip|Draw Two)$|^(Wild Wild|Wild Draw Four)$/).required() // Validar todas las cartas posibles de UNO
});