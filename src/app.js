import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import mainRouter from "./router/asyncRouter.js";
import "./lib/passport.config.js";
import { applyJWTAuthentication } from "./lib/applyJWTAuthentication.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(mainRouter());
app.use(passport.initialize());
app.use(applyJWTAuthentication);

// app.get(
//   "/check",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.send("You are authenticated");
//   }
// );

app.listen(PORT, () => {
  console.info(`Server running on ${PORT}🚀`);
});
