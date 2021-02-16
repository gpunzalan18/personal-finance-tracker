import { Injectable } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { HttpCommons } from './http-commons.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChartService extends HttpCommons {
  private chartData: ChartDataSets[];

  constructor(http: HttpClient) {
    super(http);
  }

  public getDataForMonthlyExpensesByCategory(): Observable<any> {
    return this.getMonthlyExpensesByCategory().pipe(
      map((expensesListByCategory: any) => {
        return expensesListByCategory.map((v) => {
          return {
            data: v.monthlyTransactions.map((t) => t.total),
            label: v.title,
            fill: false,
          };
        });
      })
    );
  }

  public getDataForMonthlyIncomesExpenses(): Observable<any> {
    return this.getMonthlyIncomeAndExpenses().pipe(
      map((monthlyIncomesExpenses: any) => {
        return [
          {
            data: monthlyIncomesExpenses.incomes.monthlyTransactions.map(
              (t) => t.total
            ),
            label: 'Income',
            fill: false,
          },
          {
            data: monthlyIncomesExpenses.expenses.monthlyTransactions.map(
              (t) => t.total
            ),
            label: 'Expenses',
            fill: false,
          },
        ];
      })
    );
  }
}
