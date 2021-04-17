import { Injectable } from '@angular/core';
import { ExpensesCategory } from '../models/expenses-categoy.enum';
import { StoreService } from '../store/store.service';
import * as data from './regex.json';

@Injectable({
  providedIn: 'root',
})
export class RegexService {
  regexData: any = data;
  defaultCategories: string[] = [
    'bills',
    'grocery',
    'entertainment',
    'restaurant',
    'other',
  ];
  public categoryRegexForExpenses: any[];
  constructor(private storeService: StoreService) {
    this.regexData = this.regexData.default;
    this.storeService.categories = this.defaultCategories;
    this.categoryRegexForExpenses = [
      {
        category: ExpensesCategory.BILLS,
        regex: this.regexData['bills'],
      },
      {
        category: ExpensesCategory.GROCERY,
        regex: this.regexData['grocery'],
      },
      {
        category: ExpensesCategory.ENTERTAINMENT,
        regex: this.regexData['entertainment'],
      },
      {
        category: ExpensesCategory.RESTAURANT,
        regex: this.regexData['restaurant'],
      },
    ];
  }

  getDefaultCategories(): string[] {
    return this.defaultCategories;
  }

  getSavingsRegex(): RegExp {
    return new RegExp(this.regexData['savings']);
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
