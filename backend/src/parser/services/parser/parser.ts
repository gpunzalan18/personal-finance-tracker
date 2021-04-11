import fs from "fs";
import { SRC_DIRECTORY } from "../../../app.const";
import { TransactionType } from "../../model/enum/transaction-type.enum";
import { IncomesAndExpenses } from "../../model/helpers/incomes-and-expenses";
import { MonthlyTransactions } from "../../model/helpers/monthly-transactions";
import { Transaction } from "../../model/helpers/transaction";
import { categoryService } from "../category-service";
import { jsonService } from "../json-service";
import { transactionService } from "../transaction-service";
import { CSV_DIR_PATH } from "./parser.const";
class Parser {
  public read(): void {
    const path: string = `${SRC_DIRECTORY}/${CSV_DIR_PATH}`;
    let filenames: string[] = fs.readdirSync(path);

    let incomes: MonthlyTransactions[] = [];
    let expenses: MonthlyTransactions[] = [];

    for (let i = 0; i < filenames.length; i++) {
      const filename: string = filenames[i];
      if (filename.toString().includes(".csv")) {
        console.log(`reading ${filename}`);
        let data = fs
          .readFileSync(`${path}/${filename}`)
          .toString()
          .toLocaleLowerCase();
        let cleanUpData: string[] = data.trim().split("\r\n");

        const headers: string[] = cleanUpData[0].split(",");
        let transactions: Transaction[] = this.buildTransactions(
          cleanUpData.slice(1)
        );

        incomes.push(
          transactionService.getTransactionsByType(
            transactions,
            TransactionType.INCOME
          )
        );
        expenses.push(
          transactionService.getTransactionsByType(
            transactions,
            TransactionType.EXPENSES
          )
        );
      }
    }

    const incomesAndExpenses: IncomesAndExpenses = new IncomesAndExpenses(
      incomes,
      expenses
    );

    jsonService.buildMonthlyIncomesAndExpenses(incomesAndExpenses);
    jsonService.buildExpensesByCategory(
      categoryService.getExpensesByCategory(expenses)
    );
  }

  private buildTransactions(data: string[]): Transaction[] {
    let transaction: string[];
    let transactionList: Transaction[] = [];
    for (let i = 1; i < data.length; i++) {
      transaction = data[i].replace(/"/g, "").split(",");
      let amount: number = parseInt(transaction[2]);
      transactionList.push(
        new Transaction(
          transaction[0],
          transaction[1],
          amount,
          amount >= 0 ? TransactionType.INCOME : TransactionType.EXPENSES,
          categoryService.getCategory(transaction[1])
        )
      );
    }
    return transactionList;
  }
}

export const parser: Parser = new Parser();
