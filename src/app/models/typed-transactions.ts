import { MonthlyTransactions } from './monthly-transactions';

export class TypedTransactions {
  incomes: MonthlyTransactions[] = [];
  expenses: MonthlyTransactions[] = [];
  savings: MonthlyTransactions[] = [];
}
