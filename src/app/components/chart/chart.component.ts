import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @ViewChild('myCanvas')
  public canvas!: ElementRef;
  public options: any;
  public legend: any = true;
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Input() labels: any[] = [];
  @Input() colors: any[] = [];

  ngOnInit() {
    this.options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              // stepSize: 10,
            },
          },
        ],
      },
    };
  }
}
