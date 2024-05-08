import Repository from "../repositories/groupRepository.js";

const GroupService = (dbClient, user) => {
  if(!user){
    throw new Error("User is required");
  };

  if(!dbClient){
    throw new Error("dbClient is required");
  };

  const repository = Repository(dbClient);

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
    const validatedGroup = await validateCreate(group);
    return await repository.create(validatedGroup);
  };

  const validateCreate = async (group) => {
    // validaciones de campos primero
    const name = validatedName(group.name);
    // validaciones con la base de datos
    const groupCount = await repository.countByName(name);
    if (groupCount > 0) {
      throw AppError("Ya existe un grupo con ese nombre", 409);
    }
    return { ...group, name };
  };

  const fullUpdateById = async (group) => {
    // validaciones de campos primero
    const name = validatedName(group.name);

    // validaciones con la base de datos
    const existingGroup = await repository.getById(group.id, user.id);
    if (!existingGroup) {
      throw AppError("El grupo a modificar no existe", 404);
    }

    // validaciones con la base de datos
    const groupCount = await repository.countByNameNotId(name, group.id);
    if (groupCount > 0) {
      throw AppError("Ya existe otro grupo con ese nombre", 409);
    }

    return await repository.fullUpdateById({
      ...group,
      name,
      ownerUserId: user.id,
    });
  };

  const deleteById = async (id) => {
    return await repository.deleteById(id, user.id);
  };

  const validatedName = (newName) => {
    // limpiar los datos
    const name = (newName || "").trim();
    // validar los campos individuales
    if (name.length === 0) {
      throw AppError("El nombre es requerido", 400);
    }
    if (name.length > 30) {
      throw AppError("El nombre debe ser menor de 30 caracteres", 400);
    }

    return name;
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
