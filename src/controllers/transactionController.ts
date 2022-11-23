import { Request, Response } from "express";

import * as transactionService from "../services/transactionService.js";
import * as transactionRepository from "../repositories/transactionRepository.js";
import * as userRepository from "../repositories/userRepository.js";

export async function findBalance(req: Request, res: Response) {
  const userData = res.locals.userToken;

  const balance = await transactionRepository.findBalance(userData.accountId);

  return res.status(200).send(balance);
}

export async function create(req: Request, res: Response) {
  const body = req.body;
  const debitedAccountId = res.locals.userToken.accountId;

  const accountId = await userRepository.findByUsername(body.username);
  const creditedAccountId = accountId.accountId;
  const value = parseFloat(body.value);

  await transactionService.cashOut(debitedAccountId, creditedAccountId, value);

  return res.sendStatus(201);
}

export async function getTransactions(req: Request, res: Response) {
  const { accountId } = res.locals.userToken;

  const transactions = await transactionService.get(accountId);

  return res.status(200).send(transactions);
}
