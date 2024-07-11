const GET_USERS_BY_GROUP_ID = `SELECT u.id, u.name, u.email FROM USERS u LEFT JOIN USERGROUP ug ON u.id = ug.userid AND ug.groupid = $1 WHERE ug.userid IS NULL;`;
const CREATE_USER_GROUP = `INSERT INTO usergroup(userid, groupid, createdat) VALUES ($1, $2, NOW())`;
const COUNT_BY_USER_ID = `SELECT COUNT(*) FROM usergroup WHERE userid = $1`;

const Repository = (dbClient) => {
  const getUsersByGroupId = async (groupId) => {
    const result = await dbClient.query(GET_USERS_BY_GROUP_ID, [groupId]);
    return result.rows;
  };

  const createUserGroup = async (userId, groupId) => {
    console.log(userId, groupId);
    const result = await dbClient.query(CREATE_USER_GROUP, [userId, groupId]);
    return result.rows[0];
  };

  const countByUserId = async (userId) => {
    const result = await dbClient.query(COUNT_BY_USER_ID, [userId]);
    const count = parseInt(result.rows[0].count);
    if (isNaN(count)) {
      throw "Invalid countByUserId result, is NaN!";
    }
    return count;
  };

  return {
    getUsersByGroupId,
    createUserGroup,
    countByUserId,
  };

};

export default Repository;