import * as groupServices from "./groupServices.js" 
//crud de grupos

const getAllGroups = (req, res) => {
    const groups = groupServices.getAllGroups();
    res.status(200).json(groups);
}

const getGroupById = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid id, the Id must be an integer' });
        return;
    }
    const group = groupServices.getGroupById(id);
    if (group) {
        res.status(200).json(group);
    } else {
        res.status(404).json({ message: 'Group not found' });
    }
}

const createGroup = (req, res) => {

}

export {
    getAllGroups,
    getGroupById,
    createGroup
};