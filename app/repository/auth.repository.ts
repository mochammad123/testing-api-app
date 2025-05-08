import { pool } from "../database/postgresql.database";

export const findUserByUsername = async (username: string) => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows[0];
};

export const createUser = async (
  name: string,
  username: string,
  password: string
) => {
  return await pool.query(
    "INSERT INTO users (name, username, password) VALUES ($1, $2, $3)",
    [name, username, password]
  );
};
