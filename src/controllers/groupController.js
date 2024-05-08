import { GroupService } from "../services/groupServices.js";

const GroupController = () => {

    const getAll = async (req, res) => {
        const groupServices = GroupService(req.dbClient, req.user);
        
        const groups = await groupServices.getAll();
        res.status(200).json(groups);
    }

    const getById = async (req, res) => {
        const groupServices = GroupService(req.dbClient, req.user);

        const group = await groupServices.getById(req.params.id);
        if(group){
            res.status(200).json(group);
        } else {
            res.status(404).end();
        }
    }

    const getOweAllGroups = async (req, res) => {
        const groupServices = GroupService(req.dbClient, req.user);
        const owe = groupServices.getOweAll();
        res.status(200).json({ owe });
    }

    const create = async (req, res) => {
        const groupServices = GroupService(req.dbClient, req.user);
        const group = req.body;
        group.ownerUserId = req.user.id;
        const createdGroup = await groupServices.create(group);
        res.status(201).json(createdGroup);
    }

    const fullUpdateById = async (req, res) => {
        const groupServices = GroupService(req.dbClient, req.user);
        const id = req.params.id;
        const group = {
            ...req.body,
            id,
            ownerUserId: req.user.id
        };
        const updatedGroup = await groupServices.fullUpdateById(group);
        if (updatedGroup) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    }

    const deleteById = async (req, res) => {
        const groupServices = GroupService(req.dbClient, req.user);
        const deleted = await groupServices.deleteById(req.params.id);
        if(deleted){
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    }

    return {
        getAll,
        getById,
        getOweAllGroups,
        create,
        fullUpdateById,
        deleteById
    };
};

export default GroupController;