import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { TypedTransactions } from '../models/typed-transactions';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public typedTransactions: TypedTransactions = new TypedTransactions();
  public categories: string[] = [];
  public categorizedTransactions: number[][] = [];

  constructor() {
    // this.resetStore();
  }

  public resetStore() {
    this.typedTransactions = new TypedTransactions();
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
        this.categorizedTransactions[categoryIndex][monthIndex] = categoryAmount;
      }
    });
  }
}
