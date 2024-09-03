import { drawCardSchema } from "../../models/schemas/drewCardSchems.js";

export const validateDrawCard = (req, res, next) => {
    const { error } = drawCardSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
};