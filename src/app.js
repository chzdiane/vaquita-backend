import express from "express";
import { GroupRouter } from "./router/groupRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/groups", GroupRouter());

app.listen(PORT, () => {
    console.info(`Server running on http://localhost:${PORT}`)
});