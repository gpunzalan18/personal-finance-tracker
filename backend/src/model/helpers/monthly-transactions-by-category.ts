import { MonthlyTransactions } from "./monthly-transactions";

export class MonthlyTransactionsByCategory {
  constructor(
    public readonly category: string,
    public readonly monthlyTransactions: MonthlyTransactions[]
  ) {}
}
