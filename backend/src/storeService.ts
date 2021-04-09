import fs from "fs";
import { STORE_OUTPUT_PATH } from "./app.const";

export class JSONRetrievalService {
  getMonthlyTransactions() {
    return JSON.parse(
      fs
        .readFileSync(`${STORE_OUTPUT_PATH}/monthlyIncomesExpenses.json`)
        .toString()
    );
  }

  getMonthlyTransactionsByCategories(): any {
    return JSON.parse(
      fs.readFileSync(
        `${STORE_OUTPUT_PATH}/monthlyExpensesByCategory.json`,
        "utf-8"
      )
    );
  }
}

export const jsonRetrievalService: JSONRetrievalService = new JSONRetrievalService();
