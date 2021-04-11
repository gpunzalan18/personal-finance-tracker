import { STORE_OUTPUT_PATH, STORE_OUTPUT_WRITE_PATH } from "../../app.const";
import { IncomesAndExpenses } from "../model/helpers/incomes-and-expenses";
import fs from "fs";

class JsonService {
  public buildMonthlyIncomesAndExpenses(
    incomesAndExpenses: IncomesAndExpenses
  ) {
    this.write("incomes_and_expenses", incomesAndExpenses);
  }

  public buildExpensesByCategory(expensesByCategory: any) {
    this.write("expenses_by_category", expensesByCategory);
  }

  public getMonthlyTransactions() {
    return JSON.parse(
      fs
        .readFileSync(`${STORE_OUTPUT_PATH}/incomes_and_expenses.json`)
        .toString()
    );
  }

  public getMonthlyTransactionsByCategories(): any {
    return JSON.parse(
      fs.readFileSync(`${STORE_OUTPUT_PATH}/expenses_by_category.json`, "utf-8")
    );
  }

  private write(fileName: string, data: any) {
    fs.writeFileSync(
      `${STORE_OUTPUT_WRITE_PATH}/${fileName}.json`,
      JSON.stringify(data)
    );
  }
}

export const jsonService: JsonService = new JsonService();
