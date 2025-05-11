import { createUser, findUserByUsername } from "../repository/auth.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (
  name: string,
  username: string,
  password: string
) => {
  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    throw new Error("Username sudah terdaftar, silahkan gunakan username lain");
  }

  const hash = await bcrypt.hash(password, 10);
  await createUser(name, username, hash);
};

export const loginUser = async (username: string, password: string) => {
  const user = await findUserByUsername(username);
  if (!user) {
    throw new Error("Username atau password salah");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Username atau password salah");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
    },
    token,
  };
};
