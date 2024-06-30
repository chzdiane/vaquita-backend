import UserService from "../services/userServices.js";
import userSchemas from "../validations/userValidation.js";
import AppError from "../lib/applicationError.js";

const UserController = () => {
  const getAll = async (req, res) => {
    const userServices = UserService(req.dbClient);

    const users = await userServices.getAll();
    res.status(200).json(users);
  };

  const getById = async (req, res) => {
    const userServices = UserService(req.dbClient);

    const user = await userServices.getById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).end();
    }
  };

  const create = async (req, res) => {
    const userServices = UserService(req.dbClient);
    const { error, value } = userSchemas.signUpSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw AppError(error.details.map((err) => err.message).join(","), 400);
    }
    const user = value;
    const createdUser = await userServices.create(user);
    res.status(201).json(createdUser);
  };

  const fullUpdateById = async (req, res) => {
    const userServices = UserService(req.dbClient);
    const { error, value } = userSchemas.signUpSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      throw AppError(error.details[0].message, 400);
    }
    const id = req.params.id;
    const user = {
      ...value,
      id,
    };
    const updatedUser = await userServices.fullUpdateById(user);
    if (updatedUser) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  };

  const deleteById = async (req, res) => {
    const userServices = UserService(req.dbClient);
    const deleted = await userServices.deleteById(req.params.id);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  };

  return {
    getAll,
    getById,
    create,
    fullUpdateById,
    deleteById,
  };
};

export default UserController;
