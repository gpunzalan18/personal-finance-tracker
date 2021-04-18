import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { TypedTransactions } from '../models/typed-transactions';

import * as defaultRegexData from '../../services/store/regex.json';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public typedTransactions: TypedTransactions = new TypedTransactions();
  public categories: string[] = [];
  public categorizedTransactions: number[][] = [];
  private defaultCategories: string[] = [
    'bills',
    'grocery',
    'entertainment',
    'restaurant',
    'other',
  ];
  private defaultTransactions: string = `Date,Description,Amount
        01/04/2021,"Online Banking transfer Confirmation# 123456789","1285.00"
        01/04/2021,"WHOLEFDS PTL 1 01/02 PURCHASE,"-72.35"
        01/05/2021,"APPLE PURCHASE #7d234w",-72.35"
        01/04/2021,"CAR INSURANACE AUTO-PAY","-110.34"
        02/02/2021,"transfer to saving #1234","-500.00"
        02/10/2021,"Online Banking transfer #098712344567","1800.00"
        02/14/2021,"AMAZON PRIME 1 PURCHASE PORTLAND ME","-391.00"
        02/21/2021,"POPEYE 1000 PURCHASE 123-876-123","-25.77"
        02/22/2021,"ONLINE ORDER  PURCHASE 123-000000","-55.14"
        02/29/2021,"TARGET 1 01/12 PURCHASE SPRINGFIELD","-940.00"
        02/30/2021,"APT RENT tranfer #1209385692","-800.00"
        03/09/2021,"transfer to saving #1234","-100.00"
        03/10/2021,"Online Banking transfer #098712344567","1200.00"
        03/14/2021,"TARGET 1 PURCHASE PORTLAND ME","-251.00"
        03/21/2021,"DOMINO'S 3001 PURCHASE 123-876-123","-25.77"
        03/22/2021,"ONLINE ORDER PURCHASE 999-000000","-181.14"
        03/29/2021,"TARGET 1 01/12 PURCHASE SPRINGFIELD","-166.00"
        03/30/2021,"APT RENT tranfer #1209385692","-800.00"
        04/01/2021,"PHONE BILL PFA 1 04/01","-61.48"
        04/05/2021,"AMAZON #6138 PURCHASE","-263.70"
        04/12/2021,"Online Banking transfer Confirmation# 0987654321","1500.00"
        04/16/2021,"WHOLEFDS MARKET 04/16 PURCHASE","-133.53"
        04/18/2021,"DONUT SHOP 04/18 PURCHASE 207-7475063 ME","-24.38"
        `;
  constructor() {}

  public resetStore() {
    this.typedTransactions = new TypedTransactions();
  }

  getDefaultCategories(): string[] {
    return this.defaultCategories;
  }

  getDefaultCategoriesString(): string {
    let categoryString: any = defaultRegexData;
    let defaultCategoryString: string = '';
    this.categories.forEach((category) => {
      if (category != 'other') {
        defaultCategoryString += `${category},${categoryString.default[category]}\n`;
      }
    });
    return defaultCategoryString;
  }

  getDefaultTransactions(): string {
    return this.defaultTransactions;
  }

  public addAmountToCategorizedTransactions(
    map: Map<string, number>,
    monthIndex: number
  ) {
    this.categories.forEach((category, categoryIndex) => {
      let categoryAmount = map.get(category);
      if (categoryAmount == undefined) {
        categoryAmount = 0;
      }
      if (this.categorizedTransactions[categoryIndex] == undefined) {
        this.categorizedTransactions.push([categoryAmount]);
      } else {
        this.categorizedTransactions[categoryIndex][
          monthIndex
        ] = categoryAmount;
      }
    });
  }
}
