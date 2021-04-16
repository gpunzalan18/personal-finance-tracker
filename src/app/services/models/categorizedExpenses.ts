import { ExpensesCategory } from './expenses-categoy.enum';

export class CategorizedExpenses {
  constructor(
    public readonly category: string,
    public readonly total: number
  ) {}
}
