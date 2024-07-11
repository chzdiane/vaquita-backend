import Router from "express-promise-router";
import UserGroupController from "../controllers/userGroupController.js";
import continuator from "../lib/continueDecorator.js";

const UserGroupRouter = () => {
    const router = Router();
    const userGroupController = UserGroupController();

    router.get("/:id", continuator(userGroupController.getUsersByGroupId));
    router.post("/", continuator(userGroupController.createUserGroup));

    return router;
};

export default UserGroupRouter;