import { Component, OnDestroy, OnInit } from '@angular/core';
import { ParserService } from '../../services/parser/parser.service';
import { TypedTransactions } from '../../services/models/typed-transactions';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  data: any[] = [];
  data2: any[] = [
    {
      data: [100, 234, 90, 10],
      label: 'dining',
      fill: false,
    },
    {
      data: [0, 24, 190, 100],
      label: 'amazon',
      fill: false,
    },
    {
      data: [460, 324, 10, 200],
      label: 'other',
      fill: false,
    },
  ];
  colors1 = [
    {
      borderColor: 'rgba(24,120,6,0.28)',
      backgroundColor: 'rgba(24,120,76,0.5)',
    },
    {
      borderColor: 'rgba(121,123,189,0.28)',
      backgroundColor: 'rgba(121,123,189,0.5)',
    },
    {
      borderColor: 'rgba(234,25,0,0.28)',
      backgroundColor: 'rgba(234,25,0,0.5)',
    },
  ];

  colors2 = [
    {
      borderColor: 'rgba(121,0,225,0.5)',
      backgroundColor: 'rgba(121,0,225,0.5)',
    },

    {
      borderColor: 'rgba(204,195,45,0.28)',
      backgroundColor: 'rgba(204,195,45,0.5)',
    },

    {
      borderColor: 'rgba(221,196,189,0.5)',
      backgroundColor: 'rgba(221,196,189,0.5)',
    },
  ];
  labels: string[] = [];
  uploadedTransactionsData: boolean | undefined = undefined;
  uploadCategoriesData: boolean | undefined = undefined;
  uploadedExpensesCategoryData: boolean | undefined = undefined;
  transactions$: Subject<string>;
  constructor(private parserService: ParserService) {
    this.transactions$ = parserService.readTransactionsSubject;
  }

  ngOnInit(): void {
    this.parserService.parseTransactionsSubject.subscribe(
      (data: TypedTransactions) => {
        let incomesData: number[] = [];
        let savingsData: number[] = [];
        let expensesData: number[] = [];
        this.labels = [];
        data.incomes.forEach((mt) => {
          incomesData.push(mt.total);
          this.labels.push(mt.title);
        });
        data.savings.forEach((mt) => {
          savingsData.push(mt.total);
        });
        data.expenses.forEach((mt) => {
          expensesData.push(mt.total);
        });
        this.setDataAndLabels(incomesData, savingsData, expensesData);
      }
    );
  }

  setDataAndLabels(
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

  checkUploadedTransactionsData(data: any) {
    this.uploadedTransactionsData = true;
    this.parserService.parseTransactions(data);
  }

  checkUploadedExpensesCategoryData(data: any) {
    this.uploadedExpensesCategoryData = true;
    this.parserService.parseCategoriesForExpenses(data);
  }

  uploadCategories() {
    this.uploadCategoriesData = true;
  }
  doNotUploadCategories() {
    this.uploadCategoriesData = false;
  }

  ngOnDestroy() {
    this.parserService.parseTransactionsSubject.unsubscribe();
  }
}
