import { loginSchema } from "../../models/schemas/loginUserSchena.js";


export const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
};