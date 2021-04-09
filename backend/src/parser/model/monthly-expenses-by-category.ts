import { MonthlyTransactions } from "./helpers/monthly-transactions";

export class MonthlyExpensesByCategory {
  constructor(
    public readonly title: string,
    public readonly monthlyTransactions: MonthlyTransactions[]
  ) {}
}
