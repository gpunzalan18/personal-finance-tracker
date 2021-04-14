import { MonthlyTransactions } from './monthly-transactions';

export class TypedTransactions {
  incomes: MonthlyTransactions[] = [];
  savings: MonthlyTransactions[] = [];
  expenses: MonthlyTransactions[] = [];
  constructor() {}
}

export const typedTransactions: TypedTransactions = new TypedTransactions();
