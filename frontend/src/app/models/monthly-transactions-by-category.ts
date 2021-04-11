import { MonthlyTransactions } from './monthly-transactions';

export interface MonthlyTransactionsByCategory {
  category: string;
  total: number;
  monthlyTransactions: MonthlyTransactions[];
}
