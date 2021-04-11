import { MonthlyTransactions } from "./monthly-transactions";

export class IncomesSavingsExpenses {
  public readonly title: string = "BofA Shared Checking";
  constructor(
    public readonly incomes: MonthlyTransactions[],
    public readonly savings: MonthlyTransactions[],
    public readonly expenses: MonthlyTransactions[]
  ) {}
}
