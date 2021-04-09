import fs from "fs";
import { Category } from "../../model/enum/categoy.enum";
import { MonthlyTransactions } from "../../model/helpers/monthly-transactions";
import { MonthlyExpensesByCategory } from "../../model/monthly-expenses-by-category";
import { Transaction } from "../../model/helpers/transaction";
import { CATEGORY_REGEX_LIST } from "../../app.const";

export class CategoryBuilder {
  public retrieveCategory(transactionDescription: string): Category {
    let category: Category = Category.OTHER;
    for (let i = 0; i < CATEGORY_REGEX_LIST.length; i++) {
      let categoryObj = CATEGORY_REGEX_LIST[i];
      if (transactionDescription.match(new RegExp(categoryObj.regex, "g"))) {
        category = categoryObj.category;
        break;
      }
    }
    return category;
  }

  public buildMonthlyExpensesByCategory(
    monthlyTransactions: MonthlyTransactions[]
  ): MonthlyExpensesByCategory[] {
    let monthlyExpensesByCategory: MonthlyExpensesByCategory[] = [];
    
    /** Loop through each category enum */
    let allCategories: string[] = Object.values(Category);
    allCategories.forEach((category) => {
      let totalAmount: number = 0;
      let monthlyTransactionsList: MonthlyTransactions[] = [];

      /** For each month, filter for each category */
      monthlyTransactions.forEach((monthlyTransaction) => {
        const transactions: Transaction[] = monthlyTransaction.transactions;
        let transactionsByCategory: Transaction[] = transactions.filter(
          (transaction) => {
            return transaction.category == category;
          }
        );

        /** For each month, filter for each category */
        totalAmount = transactionsByCategory
          .map((transaction) => transaction.amount)
          .reduce((prev, next) => prev + next, 0);

        const month: string = monthlyTransaction.title;
        monthlyTransactionsList.push({
          title: month,
          total: totalAmount,
          transactions: transactionsByCategory,
        });
      });

      monthlyExpensesByCategory.push({
        title: category,
        monthlyTransactions: monthlyTransactionsList,
      });
    });
    return monthlyExpensesByCategory;
  }
}

export const categoryBuilder: CategoryBuilder = new CategoryBuilder();
