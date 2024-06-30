const GET_ALL = `SELECT id, ownerUserId ,name, color, createdAt FROM groups WHERE ownerUserId = $1 ORDER BY createdAt DESC`;
const GET_BY_ID = `SELECT * FROM groups WHERE id = $1 AND ownerUserId = $2`;
const CREATE = `INSERT INTO groups (ownerUserId, name, color, createdAt) VALUES ($1, $2, $3, NOW()) RETURNING *`;
const DELETE = `DELETE FROM groups WHERE id = $1 AND ownerUserId = $2`;
const COUNT_BY_NAME = `SELECT COUNT(*) FROM groups WHERE name = $1`;
const COUNT_BY_NAME_NOT_ID = `SELECT COUNT(*) FROM groups WHERE name = $1 AND id != $2`;
const FULL_UPDATE_BY_ID = `UPDATE groups SET name = $1, color = $2, createdAt = NOW() WHERE id = $3 AND ownerUserId = $4`;

const Repository = (dbClient) => {
  //console.log(dbClient)
  const getAll = async (ownerUserId) => {
    const result = await dbClient.query(GET_ALL, [ownerUserId]);
    return result.rows;
  };

  const getById = async (id, ownerUserId) => {
    const result = await dbClient.query(GET_BY_ID, [id, ownerUserId]);
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

  const fullUpdateById = async ({ id, name, color, createdAt, ownerUserId }) => {
    const result = await dbClient.query(FULL_UPDATE_BY_ID, [
      name,
      color,
      id,
      ownerUserId,
    ]);
    return result.rowCount > 0;
  };

  const deleteById = async (id, ownerUserId) => {
    const result = await dbClient.query(DELETE, [id, ownerUserId]);
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
