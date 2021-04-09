import fs from "fs";
import { Expenses } from "../../model/helpers/expenses";
import { Incomes } from "../../model/helpers/incomes";
import { ROOT_DIRECTORY } from "../../app.const";
import { MonthlyExpensesByCategory } from "../../model/monthly-expenses-by-category";
import { MonthlyIncomesExpenses } from "../../model/monthly-incomes-expenses";

export class JSONBuilder {
  public buildMonthlyTransactions(incomes: Incomes, expenses: Expenses): void {
    let monthlyIncomesExpensesFileName: string = "monthlyIncomesExpenses";
    this.write(
      monthlyIncomesExpensesFileName,
      new MonthlyIncomesExpenses("BofA Shared Checking", incomes, expenses)
    );
  }

  public buildMonthlyExpensesByCategory(
    monthlyExpensesByCategory: MonthlyExpensesByCategory[]
  ): void {
    let monthlyExpensesByCategoryFileName: string = "monthlyExpensesByCategory";
    this.write(
      monthlyExpensesByCategoryFileName,
      monthlyExpensesByCategory
    );
  }

  private write(fileName: string, data: any) {
    fs.writeFileSync(
      `${ROOT_DIRECTORY}/assets/outputs/${fileName}.json`,
      JSON.stringify(data)
    );
  }
}

export const jsonBuilder: JSONBuilder = new JSONBuilder();
