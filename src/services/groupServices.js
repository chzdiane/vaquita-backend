import { Model } from "../lib/model.js";

const GroupService = () => {

    //creamos la instancia del Model para poder usar sus metodos
    const groupModel = Model();

    const getAll = () => {
        return groupModel.findMany();
        //return groupDB.sort((a, b) => a.name.localeCompare(b.name));
    };

    const getById = (groupId) => {
        return groupModel.findUnique(groupId);
    }

    const getOweAll = () => {
        return groupModel.findMany().reduce((acc, group) => acc + group.owe, 0);
    }

    const create = (newGroup) => {
        return groupModel.create(newGroup);
    }

    const editById = (groupId, group) => {
        return groupModel.update(groupId, group);
    }

    const removeById = (groupId) => {
        return groupModel.delete(groupId);
    }

    return {
        getAll,
        getById,
        getOweAll,
        create,
        editById,
        removeById
    };
};

export {
    GroupService
};
