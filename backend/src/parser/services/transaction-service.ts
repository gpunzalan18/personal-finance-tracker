import { Category } from "../model/enum/categoy.enum";
import { TransactionType } from "../model/enum/transaction-type.enum";
import { MonthlyTransactions } from "../model/helpers/monthly-transactions";
import { Transaction } from "../model/helpers/transaction";

class TransactionService {
  public getTransactionsByType(
    trasactions: Transaction[],
    transactionType: TransactionType
  ): MonthlyTransactions {
    let total: number = 0;
    let incomeTransactions: Transaction[] = [];
    trasactions.forEach((trasaction) => {
      if (trasaction.type === transactionType) {
        total += trasaction.amount;
        incomeTransactions.push(trasaction);
      }
    });
    return new MonthlyTransactions(
      this.getMonthForTitle(incomeTransactions[0]),
      incomeTransactions,
      total
    );
  }

  public getTransactionsByCategoryType(
    trasactions: Transaction[],
    category: Category
  ): MonthlyTransactions {
    let total: number = 0;
    let transactionsByCategory: Transaction[] = [];
    trasactions.forEach((trasaction) => {
      if (trasaction.category === category) {
        total += trasaction.amount;
        transactionsByCategory.push(trasaction);
      }
    });
    return new MonthlyTransactions(category, transactionsByCategory, total);
  }

  private getMonthForTitle(transaction: Transaction) {
    const months: string[] = ["January", "February", "March", "April", "May"];
    const monthIndex: number = parseInt(transaction.date.substr(0, 2)) - 1;
    return months[monthIndex];
  }
}

export const transactionService: TransactionService = new TransactionService();
