import Router from "express-promise-router";
import groupRouter from "./groupRoutes.js";
import { connectDatabase, commitDatabase, rollbackDatabase } from "../lib/databaseMiddleware.js";

const AsyncRouter = () => {
    const router = Router();

    router.use(connectDatabase);
    router.use("/groups", groupRouter());
    router.use(commitDatabase);
    router.use(rollbackDatabase);

    return router;
};

export default AsyncRouter;