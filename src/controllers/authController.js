import authServices from "../services/authServices.js";

const authController = () => {
  
  const login = async (req, res) => {
    const { email, password } = req.body;
    const authService = authServices(req.dbClient);
    const token = await authService.login(email, password);
    res.json({ token });
  };

  return {
    login,
  };
};

export default authController;
