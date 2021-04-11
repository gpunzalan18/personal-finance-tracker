import { MonthlyTransactions } from "./monthly-transactions";

export class IncomesAndExpenses {
  public readonly title: string = "BofA Shared Checking";
  constructor(
    public readonly incomes: MonthlyTransactions[],
    public readonly expenses: MonthlyTransactions[]
  ) {}
}
