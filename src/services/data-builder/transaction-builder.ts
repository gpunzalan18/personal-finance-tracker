import { Transaction } from "../../model/helpers/transaction";
import { MonthlyTransactions } from "../../model/helpers/monthly-transactions";
import { DATE_MONTH_MAP } from "../../app.const";

class TransactionBuilder {
  /**
   * Groups each trasactions by month
   */
  public buildMonthlyTransactions(
    transactions: Transaction[]
  ): MonthlyTransactions[] {
    let parsedTransactions: Transaction[] = [];
    let parsedTransactionsTotalAmount: number = 0;

    let MonthlyTransactionsList: MonthlyTransactions[] = [];

    let dateMonthMapKey: string = this.buildDateMonthMapKey(transactions[0]);
    let month: string = DATE_MONTH_MAP[dateMonthMapKey];

    //TODO : fix sorting
    transactions.sort((a, b) => (a.date > b.date ? 1 : -1));

    transactions.forEach((transaction) => {
      dateMonthMapKey = this.buildDateMonthMapKey(transaction);
      if (month == DATE_MONTH_MAP[dateMonthMapKey] && month != undefined) {
        parsedTransactions.push(transaction);
        parsedTransactionsTotalAmount += transaction.amount;
      } else {
        let monthlyTransactions: MonthlyTransactions = new MonthlyTransactions(
          month,
          parsedTransactions,
          parsedTransactionsTotalAmount
        );
        MonthlyTransactionsList.push(monthlyTransactions);
        month = DATE_MONTH_MAP[dateMonthMapKey];

        parsedTransactions = [];
        parsedTransactionsTotalAmount = 0;

        parsedTransactions.push(transaction);
        parsedTransactionsTotalAmount += transaction.amount;
      }
    });

    return MonthlyTransactionsList;
  }

  private buildDateMonthMapKey(transaction: Transaction): string {
    return `${transaction.date.substring(
      transaction.date.length - 2
    )}_${transaction.date.substring(0, 2)}`;
  }
}

export const transactionBuilder: TransactionBuilder = new TransactionBuilder();
