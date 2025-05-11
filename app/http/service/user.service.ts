import { findUserByUsername } from "../repository/auth.repository";
import {
  deleteUser,
  getAllUser,
  getUserById,
  insertUser,
  updateUser,
} from "../repository/user.repository";
import bcrypt from "bcryptjs";

export const getUsersService = async () => await getAllUser();

export const createUserService = async (
  name: string,
  username: string,
  password: string
) => {
  const user = await findUserByUsername(username);
  if (user) {
    throw new Error("Username sudah terdaftar, silahkan gunakan username lain");
  }

  const hash = await bcrypt.hash(password, 10);
  await insertUser({ name, username, password: hash });
};

export const updateUserService = async (
  id: number,
  name: string,
  username: string,
  password: string
) => {
  const user = await getUserById(id);
  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  const hash = await bcrypt.hash(password, 10);
  await updateUser(id, { name, username, password: hash });
};

export const deleteUserService = async (id: number) => {
  const user = await getUserById(id);
  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  await deleteUser(id);
};
