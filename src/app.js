import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import mainRouter from "./router/asyncRouter.js";
import "./lib/passport.config.js";
import userRepository from "./repositories/userRepository.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
//app.use(mainRouter());
app.use(passport.initialize());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userRepository().getByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const payload = { id: user.id };
  // { expiresIn: "1h"}
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  res.json({ token });
});

app.get(
  "/check",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("You are authenticated");
  }
);

app.use(mainRouter());

app.listen(PORT, () => {
  console.info(`Server running on http://localhost:${PORT}🚀`);
});
