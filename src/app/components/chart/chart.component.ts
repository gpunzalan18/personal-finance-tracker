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
  //public colors: any[] = [];
  public legend: any = true;
  // @Input() type: ChartType = 'bar';
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Input() labels: any[] = [];
  @Input() colors: any[] = [];

  ngOnInit() {
    // this.data = [
    //   {
    //     data: [3, 1, 4, 2, 5],
    //     label: 'incomes',
    //     fill: false,
    //   },
    //   {
    //     data: [0, 1, 2, 2, 4],
    //     label: 'savings',
    //     fill: false,
    //   },
    // ];

    // this.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    // this.colors = [
    //   {
    //     borderColor: 'rgba(24,120,6,0.28)',
    //     backgroundColor: 'rgba(24,120,76,0.5)',
    //   },
    //   {
    //     borderColor: 'rgba(121,123,189,0.28)',
    //     backgroundColor: 'rgba(121,123,189,0.5)',
    //   },
    //   {
    //     borderColor: 'rgba(234,25,0,0.28)',
    //     backgroundColor: 'rgba(234,25,0,0.5)',
    //   },
    //   {
    //     borderColor: 'rgba(7,2,195,0.28)',
    //     backgroundColor: 'rgba(121,0,225,0.5)',
    //   },

    //   {
    //     borderColor: 'rgba(204,195,45,0.28)',
    //     backgroundColor: 'rgba(204,195,45,0.5)',
    //   },

    //   {
    //     borderColor: 'rgba(121,0,189,0.28)',
    //     backgroundColor: 'rgba(121,0,189,0.5)',
    //   },
    // ];
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
      // annotation: {
      //   drawTime: 'beforeDatasetsDraw',
      //   annotations: [
      //     {
      //       type: 'box',
      //       id: 'a-box-1',
      //       yScaleID: 'y-axis-0',
      //       yMin: 0,
      //       yMax: 1,
      //       backgroundColor: '#4cf03b',
      //     },
      //     {
      //       type: 'box',
      //       id: 'a-box-2',
      //       yScaleID: 'y-axis-0',
      //       yMin: 1,
      //       yMax: 2.7,
      //       backgroundColor: '#fefe32',
      //     },
      //     {
      //       type: 'box',
      //       id: 'a-box-3',
      //       yScaleID: 'y-axis-0',
      //       yMin: 2.7,
      //       yMax: 5,
      //       backgroundColor: '#fe3232',
      //     },
      //   ],
      // },
    };
  }
}
