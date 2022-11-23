import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { CreateUser } from "../utils/createData.js";
import * as userRepository from "../repositories/userRepository.js";

export async function SignUp(createUser: CreateUser) {
  const user = createUser;

  const existingUser = await userRepository.findByUsername(user.username);
  if (existingUser)
    throw { type: "conflict", message: "Username has already been taken!" };

  const hashedPassword = bcrypt.hashSync(user.password, 10);
  await userRepository.create({ ...user, password: hashedPassword });
}

export async function SignIn(createUser: CreateUser) {
  const { username, password } = createUser;

  const user = await userRepository.findByUsername(username);
  if (!user) throw { type: "unauthorized", message: "Invalid data!" };

  const correctPassword = bcrypt.compareSync(password, user.password);
  if (!correctPassword)
    throw { type: "unauthorized", message: "Invalid password" };

  const userData = { userId: user.id };
  const secretKey = process.env.JWT_SECRET;
  const expiration = { expiresIn: 60 * 60 * 24 };

  const token = jwt.sign(userData, secretKey, expiration);

  await userRepository.createSession(token, user.id);

  return { ...user, token };
}

export async function signOut(userId: number) {
  await userRepository.endSession(userId);
}
