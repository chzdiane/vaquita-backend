import Router from "express-promise-router";
import UserController from "../controllers/userController.js";
import continuator from "../lib/continueDecorator.js";

const UserRouter = () => {
    const router = Router();
    const userController = UserController();
    
    router.get("/", continuator(userController.getAll));
    router.get("/:id", continuator(userController.getById));
    router.post("/", continuator(userController.create));
    router.put("/:id", continuator(userController.fullUpdateById));
    router.delete("/:id", continuator(userController.deleteById));

    return router;
};

export default UserRouter;