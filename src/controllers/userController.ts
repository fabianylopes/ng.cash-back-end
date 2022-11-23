import { Request, Response } from "express";

import * as userRepository from "../repositories/userRepository.js";
import * as userService from "../services/userService.js";

export async function SignUp(req: Request, res: Response) {
  const userData = req.body;

  await userService.SignUp(userData);

  res.sendStatus(201);
}

export async function SignIn(req: Request, res: Response) {
  const userData = req.body;

  const data = await userService.SignIn(userData);

  return res.status(200).send(data);
}

export async function signOut(req: Request, res: Response) {
  const { accountId } = res.locals.userToken;

  await userService.signOut(accountId);

  res.sendStatus(200);
}

export async function findAccountId(req: Request, res: Response) {
  const { username } = req.body;

  const creditedAccountId = await userRepository.findByUsername(username);

  return res.status(200).send(creditedAccountId);
}
