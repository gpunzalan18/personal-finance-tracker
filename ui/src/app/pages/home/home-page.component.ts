import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  public monthlyExpensesByCategoryData: ChartDataSets[];
  public monthlyIncomesExpensesData: ChartDataSets[];
  public labels: Label[] = ['January', 'February', 'March', 'April'];

  constructor(public chartService: ChartService) {
    this.chartService
      .getDataForMonthlyExpensesByCategory()
      .subscribe(
        (chartData: any[]) => (this.monthlyExpensesByCategoryData = chartData)
      );

    this.chartService
      .getDataForMonthlyIncomesExpenses()
      .subscribe(
        (chartData: any[]) => (this.monthlyIncomesExpensesData = chartData)
      );
  }

  ngOnInit() {}
}
