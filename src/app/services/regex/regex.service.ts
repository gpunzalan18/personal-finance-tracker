import { Injectable } from '@angular/core';
import { ExpensesCategory } from '../../models/expenses-categoy.enum';
import { StoreService } from '../store/store.service';
import * as data from '../store/regex.json';

@Injectable({
  providedIn: 'root',
})
export class RegexService {
  regexData: any = data;

  public categoryRegexForExpenses: any[];
  constructor(private storeService: StoreService) {
    this.regexData = this.regexData.default;
    this.storeService.categories = this.storeService.getDefaultCategories();
    this.categoryRegexForExpenses = [
      {
        category: ExpensesCategory.BILLS,
        regex: `(${this.regexData['bills'].replace(/,/g, '|')})`,
      },
      {
        category: ExpensesCategory.GROCERY,
        regex: `(${this.regexData['grocery'].replace(/,/g, '|')})`,
      },
      {
        category: ExpensesCategory.ENTERTAINMENT,
        regex: `(${this.regexData['entertainment'].replace(/,/g, '|')})`,
      },
      {
        category: ExpensesCategory.RESTAURANT,
        regex: `(${this.regexData['restaurant'].replace(/,/g, '|')})`,
      },
      {
        category: ExpensesCategory.SAVINGS,
        regex: `(${this.regexData['restaurant'].replace(/,/g, '|')})`,
      },
    ];
  }

  getSavingsRegex(): RegExp {
    return new RegExp('savings|to sav');
  }

  getSavingsLoanRegex(): RegExp {
    return new RegExp('savings|from sav');
  }

  setExpensesCategoryRegex(categoryMap: Map<string, string[]>): void {
    this.categoryRegexForExpenses = [];
    this.storeService.categorizedTransactions = [];
    this.storeService.categories = [];
    categoryMap.forEach((regexList, category) => {
      this.storeService.categories.push(category);
      this.categoryRegexForExpenses.push({
        category: category,
        regex: `(${regexList.join('|')})`.toLocaleLowerCase(),
      });
    });
  }

  getExpensesCategory(description: string): ExpensesCategory {
    let category: ExpensesCategory = ExpensesCategory.OTHER;

    try {
      for (let i = 0; i < this.categoryRegexForExpenses.length; i++) {
        if (
          description.match(
            new RegExp(this.categoryRegexForExpenses[i].regex, 'g')
          )
        ) {
          category = this.categoryRegexForExpenses[i].category;
          break;
        }
      }
      return category;
    } catch (e) {
      console.error(
        `ERR - RegexService.getExpensesCategory(description: string). Make sure that the csv file has the right format. ${e}`
      );
      throw e;
    }
  }
}
