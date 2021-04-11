import { Transaction } from "./transaction";

export class MonthlyTransactions {
  constructor(
    public readonly title: string,
    public readonly transactions: Transaction[],
    public readonly total: number
  ) {}
}
