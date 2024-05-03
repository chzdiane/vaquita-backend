import Repository from "../repositories/userRepository.js";

const UserService = (dbClient) => {
  const repository = Repository(dbClient);

  const getAll = async () => {
    return await repository.getAll();
  };

  const getById = async (userId) => {
    return await repository.getById(userId);
  };

  const create = async (user) => {
    //const email = validatedEmail(user.email);
    const userCount = await repository.countByEmail(user.email);
    if (userCount > 0) {
      throw AppError("Ya existe un usuario con ese email", 409);
    }
    return await repository.create(user);
  };

  const fullUpdateById = async (user) => {
    //const email = validatedEmail(user.email);
    const existingUser = await repository.getById(user.id);
    if (!existingUser) {
      throw AppError("El usuario a modificar no existe", 404);
    }
    return await repository.fullUpdateById({
      ...user,
      email,
    });
  };

  const deleteById = async (id) => {
    return await repository.deleteById(id);
  }

  return {
    getAll,
    getById,
    create,
    fullUpdateById,
  };
};

export { UserService };
