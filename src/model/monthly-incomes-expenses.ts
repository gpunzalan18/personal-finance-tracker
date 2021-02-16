import { Expenses } from "./helpers/expenses";
import { Incomes } from "./helpers/incomes";

export class MonthlyIncomesExpenses {
  constructor(
    public readonly title: string,
    public readonly incomes: Incomes,
    public readonly expenses: Expenses
  ) {}
}
