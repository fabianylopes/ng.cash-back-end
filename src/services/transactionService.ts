import * as transactionRepository from "../repositories/transactionRepository.js";

export async function cashOut(
  debitedAccountId: number,
  creditedAccountId: number,
  value: number
) {
  const balanceDebitedAccount = await transactionRepository.findBalance(
    debitedAccountId
  );
  const balanceCreditedAccount = await transactionRepository.findBalance(
    creditedAccountId
  );

  const currentBalanceDebitedAccount = balanceDebitedAccount.balance;
  const currentBalanceCreditedAccount = balanceCreditedAccount.balance;

  const newBalanceDebitedAccount = currentBalanceDebitedAccount - value;
  const newBalanceCreditedAccount = currentBalanceCreditedAccount + value;

  if (newBalanceDebitedAccount < 0)
    throw { type: "unauthorized", message: "Insufficient funds" };
  if (debitedAccountId === creditedAccountId)
    throw { type: "unauthorized", message: "You can't transfer for yourself" };

  await transactionRepository.create(
    debitedAccountId,
    creditedAccountId,
    value
  );

  await transactionRepository.updateBalance(
    debitedAccountId,
    newBalanceDebitedAccount
  );
  await transactionRepository.updateBalance(
    creditedAccountId,
    newBalanceCreditedAccount
  );
}

export async function get(accountId: number) {
  const transactions = await transactionRepository.getTransactions(accountId);

  const formatedTransactions = transactions.map((obj) => {
    if (obj.creditedAccountId === accountId) {
      return { ...obj, type: "in" };
    } else if (obj.debitedAccountId === accountId) {
      return { ...obj, type: "out" };
    }
  });

  return formatedTransactions;
}
