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

    // if (this.categorizedTransactions[index] == undefined) {
    //   this.categorizedTransactions.push([amount]);
    // } else {
    //   if (this.categorizedTransactions[index][monthIndex] == undefined) {
    //     for (let i = 0; i <= monthIndex; i++) {
    //       if (this.categorizedTransactions[index][i] == undefined) {
    //         this.categorizedTransactions[index].push(0);
    //       }
    //     }
    //     this.categorizedTransactions[index].push(amount);
    //   } else {
    //     this.categorizedTransactions[index][monthIndex] += amount;
    //   }
    // }
    // console.log(this.categorizedTransactions);
  }
}
