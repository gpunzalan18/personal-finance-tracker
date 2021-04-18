import { Component, OnDestroy, OnInit } from '@angular/core';
import { ParserService } from '../../services/parser/parser.service';
import { TypedTransactions } from '../../services/models/typed-transactions';
import { Subject } from 'rxjs';
import { RegexService } from 'src/app/services/regex/regex.service';
import { StoreService } from 'src/app/services/store/store.service';
import { Color } from 'src/app/services/models/view/color.enum';
import { ColorService } from 'src/app/services/view/color/color.service';
import * as defaultRegexData from '../../services/store/regex.json';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  data: any[] = [];
  data2: any[] = [];
  firstChartColors = [];
  firstChartTitle = 'Monthly Income';
  secondChartColors = [];
  labels: string[] = [];
  uploadedTransactionsData: boolean | undefined = undefined;
  uploadCategoriesData: boolean | undefined = undefined;
  uploadedExpensesCategoryData: boolean | undefined = undefined;
  transactions$: Subject<string>;
  isChoiceDisabled: boolean = false;
  defaultCategoryString: string = '';
  defaultTransactionDataStr: string = '';
  constructor(
    private parserService: ParserService,
    private regexService: RegexService,
    private storeService: StoreService,
    private colorService: ColorService
  ) {
    this.transactions$ = parserService.readTransactionsSubject;

    let categoryString: any = defaultRegexData;
    this.storeService.categories.forEach((cat) => {
      if (cat != 'other') {
        this.defaultCategoryString += `${cat},${categoryString.default[cat]}\n`;
      }
    });
    this.defaultTransactionDataStr = `Date,Description,Amount
        01/04/2021,"Online Banking transfer Confirmation# 123456789","1285.00"
        01/04/2021,"WHOLEFDS PTL 1 01/02 PURCHASE,"-72.35"
        01/05/2021,"APPLE PURCHASE #7d234w",-72.35"
        01/04/2021,"CAR INSURANACE AUTO-PAY","-110.34"
        02/02/2021,"transfer to saving #1234","-500.00"
        02/10/2021,"Online Banking transfer #098712344567","1800.00"
        02/14/2021,"AMAZON PRIME 1 PURCHASE PORTLAND ME","-391.00"
        02/21/2021,"POPEYE 1000 PURCHASE 123-876-123","-25.77"
        02/22/2021,"ONLINE ORDER  PURCHASE 123-000000","-55.14"
        02/29/2021,"TARGET 1 01/12 PURCHASE SPRINGFIELD","-940.00"
        02/30/2021,"APT RENT tranfer #1209385692","-800.00"
        03/09/2021,"transfer to saving #1234","-100.00"
        03/10/2021,"Online Banking transfer #098712344567","1200.00"
        03/14/2021,"TARGET 1 PURCHASE PORTLAND ME","-251.00"
        03/21/2021,"DOMINO'S 3001 PURCHASE 123-876-123","-25.77"
        03/22/2021,"ONLINE ORDER PURCHASE 999-000000","-181.14"
        03/29/2021,"TARGET 1 01/12 PURCHASE SPRINGFIELD","-166.00"
        03/30/2021,"APT RENT tranfer #1209385692","-800.00"
        04/01/2021,"PHONE BILL PFA 1 04/01","-61.48"
        04/05/2021,"AMAZON #6138 PURCHASE","-263.70"
        04/12/2021,"Online Banking transfer Confirmation# 0987654321","1500.00"
        04/16/2021,"WHOLEFDS MARKET 04/16 PURCHASE","-133.53"
        04/18/2021,"DONUT SHOP 04/18 PURCHASE 207-7475063 ME","-24.38"
        `;
  }

  ngOnInit(): void {
    this.firstChartColors = this.colorService.getColorSet([
      Color.GREEN,
      Color.PURPLE,
      Color.RED,
    ]);
    this.secondChartColors = this.colorService.getColorSet(
      Object.values(Color)
    );
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
        label: 'income',
        fill: false,
      },
    ];
    const reducer = (sum: number, curr: number) => sum + curr;
    if (savingsData.reduce(reducer) > 0) {
      this.data.push({
        data: savingsData,
        label: 'savings',
        fill: false,
      });
      this.firstChartTitle += ', Savings, ';
    }
    this.data.push({
      data: expensesData,
      label: 'expenses',
      fill: false,
    });
    this.firstChartTitle += ' and Expenses';
    this.storeService.categories.forEach((category, index) => {
      this.data2.push({
        data: this.storeService.categorizedTransactions[index],
        label: category,
        fill: false,
      });
    });
  }

  transactionDataStr: string = '';

  useDefaultData() {
    this.uploadedTransactionsData = true;
    this.transactionDataStr = this.defaultTransactionDataStr;
    this.uploadedTransactionsData = true;
  }

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
    this.isChoiceDisabled = true;
  }

  uploadCategories() {
    this.data2 = [];
    this.storeService.categories = [];
    this.storeService.categorizedTransactions = [];
    this.uploadCategoriesData = true;
  }
  doNotUploadCategories() {
    this.data2 = [];
    this.uploadCategoriesData = false;
    this.storeService.categories = this.regexService.getDefaultCategories();
    this.storeService.categorizedTransactions = [];
    this.parserService.parseTransactions(this.transactionDataStr);
  }

  ngOnDestroy() {
    this.parserService.parseTransactionsSubject.unsubscribe();
  }
}
