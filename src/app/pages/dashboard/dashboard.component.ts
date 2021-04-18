import { Component, OnDestroy, OnInit } from '@angular/core';
import { ParserService } from '../../services/parser/parser.service';
import { TypedTransactions } from '../../services/models/typed-transactions';
import { Subject } from 'rxjs';
import { RegexService } from 'src/app/services/regex/regex.service';
import { StoreService } from 'src/app/services/store/store.service';
import { Color } from 'src/app/services/models/view/color.enum';
import { ColorService } from 'src/app/services/view/color/color.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  transactionDataStr: string = '';

  firstChartData: any[] = [];
  firstChartColors: any[] = [];
  firstChartTitle: string = '';
  secondChartData: any[] = [];
  secondChartColors: any[] = [];
  labels: string[] = [];

  uploadedTransactionsData: boolean | undefined = undefined;
  uploadCategoriesData: boolean | undefined = undefined;
  defaultCategoryString: string = '';
  defaultTransactionDataStr: string = this.storeService.getDefaultTransactions();

  transactions$: Subject<string>;
  constructor(
    private parserService: ParserService,
    private regexService: RegexService,
    private storeService: StoreService,
    private colorService: ColorService
  ) {
    this.transactions$ = parserService.readTransactionsSubject;
    this.defaultCategoryString = this.storeService.getDefaultCategoriesString();
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
        this.buildChartDataAndLabels(data);
      }
    );
  }

  /*
   * helper methods to use uploaded data from user
   */
  useUploadedTransactionsData(data: any) {
    this.uploadedTransactionsData = true;
    this.transactionDataStr = data;
  }

  useUploadedCategoryData(data: any) {
    this.uploadCategoriesData = true;
    let categoryString: string[] = data.split('\n');
    let categoryMap: Map<string, any> = new Map<string, any>();
    categoryString.forEach((categoryDataString) => {
      let categoryData: string[] = categoryDataString.split(',');
      categoryMap.set(categoryData[0], categoryData.slice(1));
    });
    this.regexService.setExpensesCategoryRegex(categoryMap);
    this.parserService.parseTransactions(this.transactionDataStr);
  }

  /*
   * helper methods to use default data
   */
  useDefaultTransactionsData() {
    this.uploadedTransactionsData = true;
    this.transactionDataStr = this.defaultTransactionDataStr;
    this.uploadedTransactionsData = true;
  }
  useDefaultCategoryData() {
    this.resetCommonData();
    this.uploadCategoriesData = false;
    this.storeService.categories = this.storeService.getDefaultCategories();
    this.parserService.parseTransactions(this.transactionDataStr);
  }

  private buildChartDataAndLabels(data: TypedTransactions) {
    const typedData: any = this.getTypedTransactionsData(data);
    const incomes: number[] = typedData['incomesData'];
    const savings: number[] = typedData['savingsData'];
    const expenses: number[] = typedData['expensesData'];
    this.firstChartTitle = 'Monthly Income';
    this.firstChartData = [
      {
        data: incomes,
        label: 'income',
        fill: false,
      },
    ];
    // If there are no savings data, exclude it from the chart.
    if (savings.reduce((sum: number, curr: number) => sum + curr) > 0) {
      this.firstChartTitle += ', Savings, ';
      this.firstChartData.push({
        data: savings,
        label: 'savings',
        fill: false,
      });
    }
    this.firstChartTitle += ' and Expenses';
    this.firstChartData.push({
      data: expenses,
      label: 'expenses',
      fill: false,
    });

    this.storeService.categories.forEach((category, index) => {
      this.secondChartData.push({
        data: this.storeService.categorizedTransactions[index],
        label: category,
        fill: false,
      });
    });
  }
  /**
   * For each month, get the total amount of each typed transaction
   */
  private getTypedTransactionsData(data: TypedTransactions): any {
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
    return {
      incomesData: incomesData,
      savingsData: savingsData,
      expensesData: expensesData,
    };
  }

  private resetCommonData() {
    this.secondChartData = [];
    this.storeService.categorizedTransactions = [];
  }

  ngOnDestroy() {
    this.parserService.parseTransactionsSubject.unsubscribe();
  }
}
