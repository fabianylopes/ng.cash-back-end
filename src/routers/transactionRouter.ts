import { Router } from "express";

import * as transactionController from "../controllers/transactionController.js";
import { validateTokenMiddleware } from "../middlewares/tokenMiddleware.js";

const transactionRouter = Router();

transactionRouter.get(
  "/",
  validateTokenMiddleware,
  transactionController.findBalance
);
transactionRouter.post(
  "/cash-out",
  validateTokenMiddleware,
  transactionController.create
);
transactionRouter.get(
  "/transactions",
  validateTokenMiddleware,
  transactionController.getTransactions
);

export default transactionRouter;
