import { Transaction } from "../../model/helpers/transaction";
import { MonthlyTransactions } from "../../model/helpers/monthly-transactions";
import { DATE_MONTH_MAP } from "../../../app.const";

class TransactionBuilder {
  /**
   * Groups each trasactions by month
   */
  public buildMonthlyTransactions(
    transactions: Transaction[]
  ): MonthlyTransactions[] {

    let transactionsForCurrentMonth: Transaction[] = [];
    let transactionsForCurrentMonthTotalAmount: number = 0;

    let monthlyTransactionsList: MonthlyTransactions[] = [];

    let dateMonthMapKey: string = this.buildDateMonthMapKey(transactions[0]);
    
    //tracks the month we are currently parsing
    let month: string = DATE_MONTH_MAP[dateMonthMapKey];

    //TODO : fix sorting
    transactions.sort((a, b) => (a.date > b.date ? 1 : -1));

    transactions.forEach((transaction) => {
      dateMonthMapKey = this.buildDateMonthMapKey(transaction);
      
      if (month == DATE_MONTH_MAP[dateMonthMapKey] && month != undefined) {
        // if transaction is still in the same month, add to parsed transation.
        transactionsForCurrentMonth.push(transaction);
        transactionsForCurrentMonthTotalAmount += transaction.amount;
      } else {
        // if month is not the same:
        // 1) store the month's info
        let monthlyTransactions: MonthlyTransactions = new MonthlyTransactions(
          month,
          transactionsForCurrentMonth,
          transactionsForCurrentMonthTotalAmount
        );
        monthlyTransactionsList.push(monthlyTransactions);

        // 2) update to the next month
        month = DATE_MONTH_MAP[dateMonthMapKey];

        // 3) reset transactionsForCurrentMonth and its total amount
        transactionsForCurrentMonth = [];
        transactionsForCurrentMonthTotalAmount = 0;

        transactionsForCurrentMonth.push(transaction);
        transactionsForCurrentMonthTotalAmount += transaction.amount
      }
    });

    // store the remaining in the current month
    let monthlyTransactions: MonthlyTransactions = new MonthlyTransactions(
      month,
      transactionsForCurrentMonth,
      transactionsForCurrentMonthTotalAmount
    );
    monthlyTransactionsList.push(monthlyTransactions);

    return monthlyTransactionsList
  }

  private buildDateMonthMapKey(transaction: Transaction): string {
    return `${transaction.date.substring(
      transaction.date.length - 2
    )}_${transaction.date.substring(0, 2)}`;
  }
}

export const transactionBuilder: TransactionBuilder = new TransactionBuilder();
