const GET_ALL = `SELECT id, ownerUserId ,name, color, createdAt FROM groups`;
const GET_BY_ID = `${GET_ALL} WHERE id = $1`;
const CREATE = `INSERT INTO groups (ownerUserId, name, color, createdAt) VALUES ($1, $2, $3, NOW()) RETURNING *`;
const DELETE = `DELETE FROM groups WHERE id = $1`;
const COUNT_BY_NAME = `SELECT COUNT(*) FROM groups WHERE name = $1`;
const FULL_UPDATE_BY_ID = `UPDATE groups SET name = $1, color = $2, createdAt = $3 WHERE id = $4`;

const Repository = (dbClient) => {
  const getAll = async () => {
    const result = await dbClient.query(GET_ALL);
    return result.rows;
  };

  const getById = async (id) => {
    const result = await dbClient.query(GET_BY_ID, [id]);
    return result.rows[0];
  };

  const create = async ({ name, color, ownerUserId}) => {
    const result = await dbClient.query(CREATE, [ownerUserId, name, color]);
    return result.rows[0];
  };

  const countByName = async (name) => {
    const result = await dbClient.query(COUNT_BY_NAME, [name]);
    const count = parseInt(result.rows[0].count);
    if (isNaN(count)) {
      throw "Invalid countByName result, is NaN";
    }
    return count;
  };

  const fullUpdateById = async ({ id, name, color, createdAt }) => {
    const result = await dbClient.query(FULL_UPDATE_BY_ID, [
      name,
      color,
      createdAt,
      id,
    ]);
    return result.rowCount > 0;
  };

  const deleteById = async (id) => {
    const result = await dbClient.query(DELETE, [id]);
    return result.rowCount > 0;
  };

  const countByNameNotId = async (name, id) => {
    const result = await dbClient.query(COUNT_BY_NAME_NOT_ID, [name, id]);
    const count = parseInt(result.rows[0].count);
    if (isNaN(count)) {
      throw "Invalid countByName result, is NaN!";
    }
    return count;
  };

  return {
    getAll,
    getById,
    create,
    deleteById,
    countByName,
    fullUpdateById,
    countByNameNotId,
  };
};

export default Repository;
