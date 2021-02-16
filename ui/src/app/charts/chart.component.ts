import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  @Input() type: string;
  @Input() data: ChartDataSets[];
  @Input() labels: Label[];

  public options: any = {
    responsive: true,
  };
  public legend = true;
  public plugins = [];
}
