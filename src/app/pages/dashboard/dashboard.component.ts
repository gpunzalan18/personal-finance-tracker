import { Component, OnDestroy, OnInit } from '@angular/core';
import { typedTransactions } from 'src/app/services/models/typed-transactions';
import { ParserService } from '../../services/parser/parser.service';
import { TypedTransactions } from '../../services/models/typed-transactions';
import { MonthlyTransactions } from 'src/app/services/models/monthly-transactions';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  data: any[] = [];
  labels: string[] = [];
  constructor(private parserService: ParserService) {}

  ngOnInit(): void {
    let incomesData: number[] = [];
    let savingsData: number[] = [];
    let expensesData: number[] = [];
    this.parserService.parseTransactionsSubject.subscribe(
      (data: TypedTransactions) => {
        data.incomes.forEach((mt) => {
          incomesData.push(mt.total);
        });
        data.savings.forEach((mt) => {
          savingsData.push(mt.total);
        });
        data.expenses.forEach((mt) => {
          expensesData.push(mt.total);
        });
        this.setData(incomesData, savingsData, expensesData);
      }
    );

    this.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  }

  setData(
    incomesData: number[],
    savingsData: number[],
    expensesData: number[]
  ) {
    this.data = [
      {
        data: incomesData,
        label: 'incomes',
        fill: false,
      },
      {
        data: savingsData,
        label: 'savings',
        fill: false,
      },
      {
        data: expensesData,
        label: 'expenses',
        fill: false,
      },
    ];
  }

  ngOnDestroy() {
    this.parserService.parseTransactionsSubject.unsubscribe();
  }
}
