import authService from "../services/authentication/authService.js";

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const token = await authService.login(username, password);
    res.status(200).json({ access_token: token });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  const { access_token } = req.body;
  try {
    if (!access_token)
      return res.status(400).json({ error: "Access token is required" });
    const response = await authService.logout(access_token);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export default {
  loginUser,
  logoutUser,
};
