import Joi from 'joi';

export const sayUnoSchema = Joi.object({
  gameId: Joi.string().guid({ version: ['uuidv4'] }).required(),
  player: Joi.string().alphanum().min(3).max(30).required(),
  action: Joi.string().valid('say uno').required()
});
