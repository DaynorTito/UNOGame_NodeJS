import { playCardSchema } from "../../models/schemas/playCardSchema.js";

export const validatePlayCard = (req, res, next) => {
    const { error } = playCardSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: 'Invalid format card' });
    }
    next();
};