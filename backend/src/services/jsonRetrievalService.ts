import fs from "fs";
import { STORE_FILE_PATH } from "../app.const";

export class JSONRetrievalService {
  getMonthlyTransactions() {
    return JSON.parse(
      fs
        .readFileSync(`${STORE_FILE_PATH}/monthlyIncomesExpenses.json`)
        .toString()
    );
  }

  getMonthlyTransactionsByCategories(): any {
    return JSON.parse(
      fs.readFileSync(
        `${STORE_FILE_PATH}/monthlyExpensesByCategory.json`,
        "utf-8"
      )
    );
  }
}

export const jsonRetrievalService: JSONRetrievalService = new JSONRetrievalService();
