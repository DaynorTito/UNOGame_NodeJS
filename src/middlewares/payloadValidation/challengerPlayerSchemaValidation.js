import { challengePlayerSchema } from "../../models/schemas/challengerPlayerSchema.js";

export const validateChallengePlayer = (req, res, next) => {
    const { error } = challengePlayerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
  