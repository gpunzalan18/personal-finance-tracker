import { Injectable } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { HttpCommons } from './http-commons.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IncomesAndExpenses } from '../models/incomes-and-expenses';
import { MonthlyTransactions } from '../models/monthly-transactions';
import { MonthlyTransactionsByCategory } from '../models/monthly-transactions-by-category';

@Injectable()
export class ChartService extends HttpCommons {
  private chartData: ChartDataSets[];

  constructor(http: HttpClient) {
    super(http);
  }

  public getIncomesAndExpenses() {
    return this.getMonthlyIncomeAndExpenses().pipe(
      map((monthlyIncomesExpenses: IncomesAndExpenses) => {
        return [
          {
            data: monthlyIncomesExpenses.incomes.map(
              (monthlyTransactions: MonthlyTransactions) =>
                Math.abs(monthlyTransactions.total)
            ),
            label: 'Income',
            fill: false,
          },
          {
            data: monthlyIncomesExpenses.savings.map(
              (monthlyTransactions: MonthlyTransactions) =>
                Math.abs(monthlyTransactions.total)
            ),
            label: 'Savings',
            fill: false,
          },
          {
            data: monthlyIncomesExpenses.expenses.map((monthlyTransactions) =>
              Math.abs(monthlyTransactions.total)
            ),
            label: 'Expenses',
            fill: false,
          },
        ];
      })
    );
  }

  public getMonthlyTransactionsByCategory() {
    return this.getMonthlyExpensesByCategory().pipe(
      map((expensesListByCategory: MonthlyTransactionsByCategory[]) => {
        
        return expensesListByCategory.map((v) => {
          return {
            data: v.monthlyTransactions.map((t) => Math.abs(t.total)),
            label: v.category,
            fill: false,
          };
        });
      })
    );
  }
}
