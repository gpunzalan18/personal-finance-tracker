import fs from "fs";
import { SRC_DIRECTORY } from "../../app.const";
import { TransactionType } from "../../model/enum/transaction-type.enum";
import { IncomesSavingsExpenses } from "../../model/helpers/incomes-savings-expenses";
import { MonthlyTransactions } from "../../model/helpers/monthly-transactions";
import { Transaction } from "../../model/helpers/transaction";
import { categoryService } from "../category-service";
import { jsonService } from "../json-service";
import { TransactionService } from "../transaction-service";
import { CSV_DIR_PATH } from "./parser.const";
class Parser {
  public read(): void {
    const path: string = `${SRC_DIRECTORY}/${CSV_DIR_PATH}`;
    let filenames: string[] = fs.readdirSync(path);

    let incomes: MonthlyTransactions[] = [];
    let expenses: MonthlyTransactions[] = [];
    let savings: MonthlyTransactions[] = [];

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
        const transactionService: TransactionService = new TransactionService(
          filename.toString()
        );
        let transactions: Transaction[] = transactionService.buildTransactions(
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
        savings.push(
          transactionService.getTransactionsByType(
            transactions,
            TransactionType.SAVINGS
          )
        );
      }
    }

    const incomesAndExpenses: IncomesSavingsExpenses = new IncomesSavingsExpenses(
      incomes,
      savings,
      expenses
    );

    jsonService.buildMonthlyIncomesAndExpenses(incomesAndExpenses);
    jsonService.buildExpensesByCategory(
      categoryService.getExpensesByCategory(expenses)
    );
  }
}

export const parser: Parser = new Parser();
