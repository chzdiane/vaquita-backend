import { groupDB } from "./memory.js"

const getAllGroups = () => {
    return groupDB.sort((a, b) => a.name.localeCompare(b.name));
};

const getGroupById = (gruopId) => {
    return groupDB.find(group => group.id === gruopId);
}

const createGroup = (group) => {

}

export {
    getAllGroups,
    getGroupById,
    createGroup
};