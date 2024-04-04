import express from "express";
import { GroupController } from "../controllers/groupController.js"

const GroupRouter = () => {

    const groupController = GroupController();
    const router = express.Router();

    router.get('/', groupController.getAll);
    router.get('/:id', groupController.getById);
    //router.get('/owe', groupController.getOweAllGroups);
    router.post('/', groupController.create);
    router.put('/:id', groupController.edit);
    router.delete('/:id', groupController.remove);

    return router;
}

export { GroupRouter };