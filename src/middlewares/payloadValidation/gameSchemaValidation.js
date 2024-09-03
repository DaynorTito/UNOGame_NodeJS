import { gameSchema } from "../../models/schemas/gameSchema.js";

export const validateGame = (req, res, next) => {
    const { error } = gameSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
};