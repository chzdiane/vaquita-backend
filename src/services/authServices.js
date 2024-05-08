import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserService from "./userServices.js";
import AppError from "../lib/applicationError.js";

const authServices = (dbClient) => {
  const userService = UserService(dbClient);

  const login = async (email, password) => {
    const user = await userService.getByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw AppError(401, "Invalid credentials");
    }

    const payload = { id: user.id };
    // { expiresIn: "1h"}
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return token;
  };

  return {
    login,
  };
};

export default authServices;
