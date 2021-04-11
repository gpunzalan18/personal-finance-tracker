import { ExpensesCategory } from "../model/enum/expenses-categoy.enum";
import { TransactionType } from "../model/enum/transaction-type.enum";
import { MonthlyTransactions } from "../model/helpers/monthly-transactions";
import { Transaction } from "../model/helpers/transaction";
import { categoryService } from "./category-service";
import { savingsRegex } from "./parser/savings-regex";

export class TransactionService {
  constructor(private readonly filename: string) {}
  public getTransactionsByType(
    trasactions: Transaction[],
    transactionType: TransactionType
  ): MonthlyTransactions {
    let total: number = 0;
    let transactionsByType: Transaction[] = [];
    trasactions.forEach((transaction) => {
      if (transaction.type === transactionType) {
        total += transaction.amount;
        transactionsByType.push(transaction);
      }
    });

    return new MonthlyTransactions(
      this.getMonthForTitle(this.filename),
      transactionsByType,
      total
    );
  }

  public buildTransactions(data: string[]): Transaction[] {
    let transaction: string[];
    let transactionList: Transaction[] = [];
    for (let i = 1; i < data.length; i++) {
      transaction = data[i].replace(/"/g, "").split(",");
      let amount: number = parseInt(transaction[2]);
      let transactionType: TransactionType = TransactionType.INCOME;
      if (amount < 0) {
        if (transaction[1].match(new RegExp(savingsRegex.list[0]))) {
          transactionType = TransactionType.SAVINGS;
        } else {
          transactionType = TransactionType.EXPENSES;
        }
      }
      transactionList.push(
        new Transaction(
          transaction[0],
          transaction[1],
          amount,
          transactionType,
          categoryService.getCategory(transaction[1])
        )
      );
    }
    return transactionList;
  }
  private getMonthForTitle(filename: string) {
    const months: string[] = ["January", "February", "March", "April", "May"];
    const monthIndex: number = parseInt(filename.substr(5, 2)) - 1;
    return months[monthIndex];
  }
}
