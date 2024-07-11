import UserGroupService from "../services/userGroupServices.js";
import userGroupSchema from "../validations/userGroupValidation.js";
import AppError from "../lib/applicationError.js";

const UserGroupController = () => {
  const getUsersByGroupId = async (req, res) => {
    const userGroupService = UserGroupService(req.dbClient);

    const users = await userGroupService.getUsersByGroupId(req.params.id);
    res.status(200).json(users);
  };

  const createUserGroup = async (req, res) => {
    const userGroupService = UserGroupService(req.dbClient);

    const { error, value } = userGroupSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw AppError(error.details.map((err) => err.message).join(","), 400);
    }
    const userGroup = value;
    const createdUserGroup = await userGroupService.createUserGroup(userGroup);
    res.status(201).json(createdUserGroup);
  };

  return {
    getUsersByGroupId,
    createUserGroup,
  };
};

export default UserGroupController;
