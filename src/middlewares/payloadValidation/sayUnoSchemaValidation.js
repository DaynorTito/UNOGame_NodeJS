import { sayUnoSchema } from "../../models/schemas/sayUnoSchema.js";

export const validateSayUno = (req, res, next) => {
    const { error } = sayUnoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
  