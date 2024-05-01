import "dotenv/config";
import express from "express";
import cors from "cors";
import mainRouter from "./router/asyncRouter.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(mainRouter());


app.listen(PORT, () => {
    console.info(`Server running on http://localhost:${PORT}`)
});