import Repository from "../repositories/groupRepository.js";
import UserGroupRepository from "../repositories/userGroupRepository.js";
import AppError from "../lib/applicationError.js";

const GroupService = (dbClient, user) => {
  if (!user) {
    throw new Error("User is required");
  }

  if (!dbClient) {
    throw new Error("dbClient is required");
  }

  const repository = Repository(dbClient);
  const userGroupRepository = UserGroupRepository(dbClient);

  const getAll = async () => {
    return await repository.getAll(user.id);
  };

  const getById = async (groupId) => {
    return await repository.getById(groupId, user.id);
  };

  const getOweAll = async () => {
    //return groupModel.findMany().reduce((acc, group) => acc + group.owe, 0);
  };

  const create = async (group) => {
    //validamos el grupo
    const groupCount = await repository.countByName(group.name);
    if (groupCount > 0) {
      throw AppError("Ya existe un grupo con ese nombre", 409);
    }
    const createdGroup = await repository.create(group);
    if (createdGroup) {
      await userGroupRepository.createUserGroup(
        group.ownerUserId,
        createdGroup.id
      );
    }
    return createdGroup;
  };

  const fullUpdateById = async (group) => {
    // validaciones con la base de datos
    const existingGroup = await repository.getById(group.id, user.id);
    if (!existingGroup) {
      throw AppError("El grupo a modificar no existe", 404);
    }

    // validaciones con la base de datos
    const groupCount = await repository.countByNameNotId(group.name, group.id);
    if (groupCount > 0) {
      throw AppError("Ya existe otro grupo con ese nombre", 409);
    }

    return await repository.fullUpdateById({
      ...group,
      ownerUserId: user.id,
    });
  };

  const deleteById = async (id) => {
    return await repository.deleteById(id, user.id);
  };

  return {
    getAll,
    getById,
    getOweAll,
    create,
    fullUpdateById,
    deleteById,
  };
};

export { GroupService };
