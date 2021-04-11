import { categoryRegex } from "./parser/category-regex";
import { ExpensesCategory } from "../model/enum/expenses-categoy.enum";
import { MonthlyTransactions } from "../model/helpers/monthly-transactions";
import { MonthlyTransactionsByCategory } from "../model/helpers/monthly-transactions-by-category";
import { Transaction } from "../model/helpers/transaction";

class CategoryService {
  public getCategory(description: string): ExpensesCategory {
    let category: ExpensesCategory = ExpensesCategory.OTHER;
    const categoryRegexList: any[] = categoryRegex.list;
    try {
      for (let i = 0; i < categoryRegexList.length; i++) {
        if (description.match(new RegExp(categoryRegexList[i].regex, "g"))) {
          category = categoryRegexList[i].category;
          break;
        }
      }
      return category;
    } catch (e) {
      console.error(
        `ERR - CategoryService. Make sure that the file has the right format. ${e}`
      );
      throw e;
    }
  }

  public getExpensesByCategory(
    expenses: MonthlyTransactions[]
  ): MonthlyTransactionsByCategory[] {
    let filteredMonthlyTransactions: MonthlyTransactions[];
    let filteredTransactions: Transaction[];
    let amount: number;
    let monthlyTransactionsByCategory: MonthlyTransactionsByCategory[] = [];
    const categories: string[] = Object.values(ExpensesCategory);
    for (let i = 0; i < categories.length; i++) {
      filteredMonthlyTransactions = [];

      expenses.forEach((monthlyTransactions: MonthlyTransactions) => {
        filteredTransactions = [];
        amount = 0;
        monthlyTransactions.transactions.forEach((transaction) => {
          if (transaction.category == categories[i]) {
            filteredTransactions.push(transaction);
            amount += transaction.amount;
          }
        });
        filteredMonthlyTransactions.push(
          new MonthlyTransactions(
            monthlyTransactions.title,
            filteredTransactions,
            amount
          )
        );
      });
      monthlyTransactionsByCategory.push(
        new MonthlyTransactionsByCategory(
          categories[i],
          filteredMonthlyTransactions
        )
      );
    }

    return monthlyTransactionsByCategory;
  }
}

export const categoryService: CategoryService = new CategoryService();
