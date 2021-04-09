const pdf = require("pdf-parse");
import fs from "fs";
import { Incomes } from "../../model/helpers/incomes";
import { Transaction } from "../../model/helpers/transaction";
import { Expenses } from "../../model/helpers/expenses";
import { SRC_DIRECTORY } from "../../../app.const";
import { TransactionType } from "../../model/enum/transaction-type.enum";
import { tansactionParser } from "./transaction-parser";
import { transactionBuilder } from "../data-builder/transaction-builder";
import { categoryBuilder } from "../data-builder/category-builder";
import { jsonBuilder } from "../data-builder/json-builder";

class Parser {
  public async read(): Promise<void> {
    let incomeTransactions: Transaction[] = [];
    let expensesTransactions: Transaction[] = [];

    let statementsDirPath = `${SRC_DIRECTORY}/store/statements/shared`;
    let filenames: string[] = fs.readdirSync(statementsDirPath);

    return new Promise((resolve, reject) => {
      for (let i = 0; i < filenames.length; i++) {
        const filename: string = filenames[i];
        console.log(`reading ${filename}`);
        if (filename.toString().includes(".pdf")) {
          pdf(fs.readFileSync(`${statementsDirPath}/${filename}`))
            .then(async (pdfData) => {
              incomeTransactions = incomeTransactions.concat(
                await tansactionParser.parseTransactionsByKeyWords(
                  pdfData.text,
                  "Deposits and other additions\nDateDescriptionAmount",
                  "Total deposits and other additions",
                  TransactionType.INCOME
                )
              );
              expensesTransactions = expensesTransactions.concat(
                await tansactionParser.parseTransactionsByKeyWords(
                  pdfData.text,
                  "Withdrawals and other subtractions\nDateDescriptionAmount",
                  "Total withdrawals and other subtractions",
                  TransactionType.EXPENSES
                )
              );

              if (i == filenames.length - 1) {
                let expenses: Expenses = new Expenses(
                  transactionBuilder.buildMonthlyTransactions(
                    expensesTransactions
                  )
                );

                /** monthlyExpensesByCategory.json */
                jsonBuilder.buildMonthlyExpensesByCategory(
                  categoryBuilder.buildMonthlyExpensesByCategory(
                    expenses.monthlyTransactions
                  )
                );
                /** monthlyIncomesExpenses.json */
                jsonBuilder.buildMonthlyTransactions(
                  new Incomes(
                    transactionBuilder.buildMonthlyTransactions(
                      incomeTransactions
                    )
                  ),
                  expenses
                );

                resolve();
              }
            })
            .catch((error) => {
              reject(error);
            });
        }
      }
    });
  }
}

export const parser: Parser = new Parser();
