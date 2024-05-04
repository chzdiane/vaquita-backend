import Router from "express-promise-router";
import groupRouter from "./groupRoutes.js";
import userRouter from "./userRoutes.js";
import authRouter from "./authRoutes.js";
import passport from "passport";
import { connectDatabase, commitDatabase, rollbackDatabase } from "../lib/databaseMiddleware.js";

const AsyncRouter = () => {
    const router = Router();

    router.use(connectDatabase);
    router.use("/auth", authRouter());
    router.use(passport.authenticate("jwt", { session: false }))
    router.use("/groups", groupRouter());
    router.use("/users", userRouter());
    router.use(commitDatabase);
    router.use(rollbackDatabase);

    return router;
};

export default AsyncRouter;