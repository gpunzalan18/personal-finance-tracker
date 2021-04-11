import { MonthlyTransactions } from './monthly-transactions';

export interface IncomesAndExpenses {
  title: string;
  incomes: MonthlyTransactions[];
  savings: MonthlyTransactions[];
  expenses: MonthlyTransactions[];
}
