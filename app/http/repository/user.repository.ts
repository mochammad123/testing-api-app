import { pool } from "../../database/postgresql.database";
import { IUser } from "../models/auth.model";

export const getAllUser = async (): Promise<Omit<IUser, "password">[]> => {
  const res = await pool.query(
    "SELECT id, name, username FROM users ORDER BY name"
  );
  return res.rows;
};

export const getUserById = async (
  id: number
): Promise<Omit<IUser, "password"> | null> => {
  const res = await pool.query(
    "SELECT id, name, username FROM users WHERE id = $1",
    [id]
  );
  return res.rows[0] || null;
};

export const insertUser = async (user: Omit<IUser, "id">): Promise<void> => {
  await pool.query(
    "INSERT INTO users (name, username, password) VALUES ($1, $2, $3)",
    [user.name, user.username, user.password]
  );
};

export const updateUser = async (
  id: number,
  user: Partial<Omit<IUser, "id">>
): Promise<void> => {
  await pool.query(
    "UPDATE users SET name = $1, username = $2, password = $3 WHERE id = $3",
    [user.name, user.username, id]
  );
};

export const deleteUser = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
};
