import express from "express";
import cors from "cors";
import { groupRoutes } from "./group/groupRoutes.js";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(groupRoutes);

app.listen(PORT, () => {
    console.info(`Server running on http://localhost:${PORT}`)
});