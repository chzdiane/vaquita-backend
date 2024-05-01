import Router from "express-promise-router";
import GroupController from "../controllers/groupController.js";
import continuator from "../lib/continueDecorator.js";

const GroupRouter = () => {
  const router = Router();
  const groupController = GroupController();

  router.get("/", continuator(groupController.getAll));
  router.get("/:id", continuator(groupController.getById));
  //router.get('/owe', continuator(groupController.getOweA)llGroups);
  router.post("/", continuator(groupController.create));
  router.put("/:id", continuator(groupController.fullUpdateById));
  router.delete("/:id", continuator(groupController.deleteById));

  return router;
};

export default GroupRouter;
