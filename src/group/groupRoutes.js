import express from "express";
import { getAllGroups, getGroupById, createGroup } from "./groupController.js"

const router = express.Router();

router.get('/groups', getAllGroups);
router.get('/groups/:id', getGroupById);
router.post('/groups', createGroup);

export { router as groupRoutes};