import bcrypt from "bcrypt";

const GET_ALL = 'SELECT * FROM users';
const GET_BY_ID = `${GET_ALL} WHERE id = $1`;
const FULL_UPDATE_BY_ID = `UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4`;
const DELETE = `DELETE FROM users WHERE id = $1`;
const COUNT_BY_EMAIL = `SELECT COUNT(*) FROM users WHERE email = $1`;
const CREATE = `INSERT INTO users (name, email, password, createdAt) VALUES ($1, $2, $3, NOW()) RETURNING *`;
const GET_BY_EMAIL = `${GET_ALL} WHERE email = $1`;

const Repository = (dbClient) => {
    const getAll = async () => {
        const result = await dbClient.query(GET_ALL);
        return result.rows;
    };

    const getById = async (id) => {
        const result = await dbClient.query(GET_BY_ID, [id]);
        return result.rows[0];
    };

    const create = async ({ name, email, password }) => {
        password = await bcrypt.hash(password, 10);
        const result = await dbClient.query(CREATE, [name, email, password]);
        return result.rows[0];
    };

    const fullUpdateById = async ({ id, name, email, password }) => {
        const result = await dbClient.query(FULL_UPDATE_BY_ID, [
            name,
            email,
            password,
            id,
        ]);
        return result.rowCount > 0;
    };

    const deleteById = async (id) => {
        const result = await dbClient.query(DELETE, [id]);
        return result.rowCount > 0;
    };

    const countByEmail = async (email) => {
        const result = await dbClient.query(COUNT_BY_EMAIL, [email]);
        const count = parseInt(result.rows[0].count);
        if (isNaN(count)) {
            throw "Invalid countByEmail result, is NaN!";
        }
        return count;
    };

    const getByEmail = async (email) => {
        const result = await dbClient.query(GET_BY_EMAIL, [email]);
        return result.rows[0];
    };

    return {
        getAll,
        getById,
        create,
        deleteById,
        fullUpdateById,
        countByEmail,
        getByEmail,
    };
};

export default Repository;