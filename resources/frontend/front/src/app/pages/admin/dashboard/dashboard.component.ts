import { AppService } from './../../../app.service';
import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { LayoutAppService } from 'src/app/layout_app/layout_app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  isRTL = false;
  constructor(private appService: AppService, private layoutService: LayoutAppService) {
    this.appService.pageTitle = 'Dashboard 1 - Dashboards';

    // if (themeSettingsService.isDarkStyle()) {
    //   this.chart1Options.scales.xAxes[0].ticks.fontColor = '#fff';
    //   this.chart1Options.scales.yAxes[0].ticks.fontColor = '#fff';
    //   (this.chart1Options as any).legend = { labels: { fontColor: '#fff' } };
    //   this.chart6Options.legend.labels = {
    //     fontColor: '#fff',
    //     boxWidth: 12
    //   } as any;
    // }
  }
  // Chart 1
  //

  chart1Data = [{
    label: 'Job',
    data: [93, 25, 95, 59, 46, 68, 4, 41],
    borderWidth: 1
  }, {
    label: 'Profit',
    data: [83, 1, 43, 28, 56, 82, 80, 66],
    borderWidth: 1,
    borderDash: [5, 5]
  }];
  chart1Options = {
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          fontColor: '#aaa'
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          fontColor: '#aaa',
          stepSize: 20
        }
      }]
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart1Colors = [{
    backgroundColor: 'rgba(28,180,255,.05)',
    borderColor: 'rgba(28,180,255,1)'
  }, {
    backgroundColor: 'rgba(136, 151, 170, 0.1)',
    borderColor: '#8897aa'
  }];

  // Chart 2
  //

  chart2Data = [{
    data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
      38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
    ],
    borderWidth: 0
  }];
  chart2Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart2Colors = [{
    backgroundColor: '#673AB7'
  }];


  // Chart 3
  //

  chart3Data = [{
    data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
      38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 18
    ],
    borderWidth: 1,
    pointRadius: 1,
    lineTension: 0
  }];
  chart3Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart3Colors = [{
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: '#009688',
    pointBorderColor: 'rgba(0,0,0,0)'
  }];


  // Chart 4
  //

  chart4Data = [{
    data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
      38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 60
    ],
    borderWidth: 1,
    pointRadius: 1,
    lineTension: 0
  }];
  chart4Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart4Colors = [{
    backgroundColor: 'rgba(206, 221, 54, 0)',
    borderColor: 'rgba(206, 221, 54, 1)',
    pointBorderColor: 'rgba(0,0,0,0)'
  }];


  // Chart 5
  //

  chart5Data = [{
    data: [24, 92, 77, 90, 91, 78, 28, 49, 23, 81, 15, 97, 94, 16, 99, 61,
      38, 34, 48, 3, 5, 21, 27, 4, 33, 40, 46, 47, 48, 60
    ],
    borderWidth: 1,
    pointRadius: 1,
    lineTension: 0
  }];
  chart5Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart5Colors = [{
    backgroundColor: 'rgba(136, 151, 170, .2)',
    borderColor: 'rgba(136, 151, 170, 1)',
    pointBorderColor: 'rgba(0,0,0,0)'
  }];


  // Chart 6
  //

  chart6Data = [{
    data: [1225, 654, 211],
    borderWidth: 1
  }];
  chart6Options = {
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      position: 'right',
      labels: {
        boxWidth: 12
      }
    },
    responsive: false,
    maintainAspectRatio: false
  };
  chart6Colors = [{
    backgroundColor: ['rgba(99,125,138,0.5)', 'rgba(28,151,244,0.5)', 'rgba(2,188,119,0.5)'],
    borderColor: ['#647c8a', '#2196f3', '#02bc77']
  }];

  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;

  ngOnInit(): void {
  }
  ngAfterViewInit(): any {
    setTimeout(() => {
      const resizeCharts = () => this.charts.forEach(chart => chart.chart.resize());

      // Initial resize
      resizeCharts();

      // For performance reasons resize charts on delayed resize event
      this.layoutService.on('resize.dashboard-1', resizeCharts);
    });
  }

  ngOnDestroy(): any {
    setTimeout(() => this.layoutService.off('resize.dashboard-1'));
  }
}
