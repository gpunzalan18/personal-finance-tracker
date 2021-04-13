import { Injectable } from '@angular/core';
import { ExpensesCategory } from '../models/expenses-categoy.enum';
import * as data from './regex.json';

@Injectable({
  providedIn: 'root',
})
export class RegexService {
  regexData: any = data;
  categoryRegexForExpenses: any[];
  constructor() {
    this.regexData = this.regexData.default;
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
      {
        category: ExpensesCategory.LEGAL,
        regex: this.regexData['legal'],
      },
      {
        category: ExpensesCategory.GIVE,
        regex: this.regexData['give'],
      },
    ];
  }

  getSavingsRegex(): RegExp {
    return new RegExp(this.regexData['savings']);
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
