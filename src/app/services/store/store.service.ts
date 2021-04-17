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

  public addAmountToCategorizedTransactions(category: string, amount: number) {
    let index: number = this.categories.indexOf(category);
    if (this.categorizedTransactions != undefined) {
      if (this.categorizedTransactions[index] != undefined) {
        this.categorizedTransactions[index].push(amount);
      } else {
        this.categorizedTransactions[index] = [amount];
      }
    }
  }
}
