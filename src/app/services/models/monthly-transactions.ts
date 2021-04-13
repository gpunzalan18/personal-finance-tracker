import { Transaction } from './transaction';

export class MonthlyTransactions {
  constructor(
    public title: string,
    public transactions: Transaction[],
    public total: number
  ) {}
}
