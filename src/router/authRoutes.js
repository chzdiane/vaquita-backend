import Router from "express-promise-router";
import authController from "../controllers/authController.js";
import continuator from "../lib/continueDecorator.js";

const AuthRouter = () => {
    const router = Router();
    const controller = authController();

    router.post("/login", continuator(controller.login));
    router.post("/register", continuator(controller.register));

    return router;
};

export default AuthRouter;