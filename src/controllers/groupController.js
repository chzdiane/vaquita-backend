import { GroupService } from "../services/groupServices.js";

const GroupController = () => {

    const groupServices = GroupService();

    const getAll = (req, res) => {
        const groups = groupServices.getAll();
        res.status(200).json(groups);
    }

    const getById = (req, res) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: 'Invalid id, the Id must be an integer' });
            return;
        }
        const group = groupServices.getById(id);
        if (group) {
            res.status(200).json(group);
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    }

    const getOweAllGroups = (req, res) => {
        const owe = groupServices.getOweAll();
        res.status(200).json({ owe });
    }

    const create = (req, res) => {
        const newGroup = req.body;
        if(newGroup.name == "" && newGroup.name.length > 30){
            res.status(400).json({message: 'Group name is empty or too long'});
            return;
        }
        const groupAlreadyExists = groupServices.getAll().find(group => group.name === newGroup.name);
        //console.log(groupAlreadyExists);
        if(groupAlreadyExists){
            res.status(400).json({message: 'Group already exists'});
            return;
        }
        groupServices.create(newGroup);
        res.status(201).json(newGroup);
    }

    const edit = (req, res) => {
        const id = req.params.id;
        const group = req.body;
        const updatedGroup = groupServices.editById(id, group);
        //console.log(updatedGroup);
        //console.log(id, group);
        if (updatedGroup) {
            res.status(200).json(updatedGroup);
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    }

    const remove = (req, res) => {
        const id = req.params.id;
        const deleted = groupServices.removeById(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    }

    return {
        getAll,
        getById,
        getOweAllGroups,
        create,
        edit,
        remove
    };
};

export {
    GroupController
};