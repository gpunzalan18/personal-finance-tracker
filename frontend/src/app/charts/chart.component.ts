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
  @Input() title: string;
  @Input() data: ChartDataSets[];
  @Input() labels: Label[];

  public options: any = {
    responsive: true,
  };
  public legend = true;
  public plugins = [];
  public colors: Color[] = [
    {
      borderColor: 'rgba(24,120,6,0.28)',
      backgroundColor: 'rgba(24,120,76,0.5)',
    },
    {
      borderColor: 'rgba(234,25,0,0.28)',
      backgroundColor: 'rgba(234,25,0,0.5)',
    },
    {
      borderColor: 'rgba(7,2,195,0.28)',
      backgroundColor: 'rgba(121,0,225,0.5)',
    },
    {
      borderColor: 'rgba(204,195,45,0.28)',
      backgroundColor: 'rgba(204,195,45,0.5)',
    },

    {
      borderColor: 'rgba(121,0,189,0.28)',
      backgroundColor: 'rgba(121,0,189,0.5)',
    },
    {
      borderColor: 'rgba(121,123,189,0.28)',
      backgroundColor: 'rgba(121,123,189,0.5)',
    },
  ];
}
