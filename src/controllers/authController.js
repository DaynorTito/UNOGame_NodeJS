
const loginUser = async(req, res, next) => {
  const {username, password} = req.body;
  try {
      const token = await req.authenticationHandler.login(username, password);
      res.status(200).json({access_token: token});
  } catch (error) {
      next(error);
  }
};


const logoutUser = async (req, res, next) => {
    const { access_token } = req.body;
    
    if (!access_token)
      return res.status(400).json({ error: 'Access token is required' });
  
    try {
      const response = await req.authenticationHandler.logout(access_token);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

export default {
  loginUser, 
  logoutUser
};
