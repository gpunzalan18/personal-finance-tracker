import { Component, OnDestroy, OnInit } from '@angular/core';
import { ParserService } from '../../services/parser/parser.service';
import { TypedTransactions } from '../../services/models/typed-transactions';
import { Subject } from 'rxjs';
import { RegexService } from 'src/app/services/regex/regex.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  data: any[] = [];
  data2: any[] = [];
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
  constructor(
    private parserService: ParserService,
    private regexService: RegexService,
    private storeService: StoreService
  ) {
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
        data.savings?.forEach((mt) => {
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
    this.storeService.categories.forEach((category, index) => {
      this.data2.push({
        data: this.storeService.categorizedTransactions[index],
        label: category,
        fill: false,
      });
    });
  }

  transactionDataStr: string = '';

  checkUploadedTransactionsData(data: any) {
    this.uploadedTransactionsData = true;
    this.transactionDataStr = data;
  }

  checkUploadedExpensesCategoryData(data: any) {
    this.uploadedExpensesCategoryData = true;
    let categoryString: string[] = data.split('\n');
    let categoryMap: Map<string, any> = new Map<string, any>();
    categoryString.forEach((categoryDataString) => {
      let categoryData: string[] = categoryDataString.split(',');
      categoryMap.set(categoryData[0], categoryData.slice(1));
    });
    this.regexService.setExpensesCategoryRegex(categoryMap);
    this.parserService.parseTransactions(this.transactionDataStr);
  }

  uploadCategories() {
    this.uploadCategoriesData = true;
  }
  doNotUploadCategories() {
    this.uploadCategoriesData = false;
    this.parserService.parseTransactions(this.transactionDataStr);
  }

  ngOnDestroy() {
    this.parserService.parseTransactionsSubject.unsubscribe();
  }
}
