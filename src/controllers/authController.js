import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserService from "../services/userServices.js";

const authController = () => {
  const login = async (req, res) => {
    const { email, password } = req.body;
    const service = UserService(req.dbClient)
    const user = await service.getByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = { id: user.id};
    // { expiresIn: "1h"}
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ token });
  };

  return {
    login,
  };
};

export default authController;
