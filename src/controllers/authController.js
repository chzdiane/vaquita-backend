import authServices from "../services/authServices.js";
import userSchemas from "../validations/userValidation.js";
import AppError from "../lib/applicationError.js";

const authController = () => {
  
  const login = async (req, res) => {
    const { error, value } = userSchemas.loginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw AppError(error.details.map((err) => err.message).join(","), 400);
    }
    const {email, password} = value;

    const authService = authServices(req.dbClient);
    const token = await authService.login(email, password);
    res.json({ token });
  };

  return {
    login,
  };
};

export default authController;
