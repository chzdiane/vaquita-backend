import Repository from "../repositories/userGroupRepository.js";
import AppError from "../lib/applicationError.js";

const UserGroupService = (dbClient) => {
  const repository = Repository(dbClient);

  const getUsersByGroupId = async (groupId) => {
    return await repository.getUsersByGroupId(groupId);
  };

  const createUserGroup = async (userGroup) => {
    const createdGroups = [];
    const { usersId, groupId } = userGroup;
    const userGroupCount = await repository.countByUserId(usersId[0]);
    if (userGroupCount > 0) {
      throw AppError("Ya existe un grupo con ese nombre", 409);
    }
    usersId.forEach(async (userId) => {
      const createdGroup = await repository.createUserGroup(userId, groupId);
      createdGroups.push(createdGroup);
    });
    return createdGroups;
  };

  return {
    getUsersByGroupId,
    createUserGroup,
  };
};

export default UserGroupService;
