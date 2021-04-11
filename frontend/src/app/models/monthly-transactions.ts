import { Transaction } from './transaction';

export interface MonthlyTransactions {
  title: string;
  total: number;
  transactions: Transaction[];
}
