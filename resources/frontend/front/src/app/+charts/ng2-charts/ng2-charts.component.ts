import { Component, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';
import { BaseChartDirective } from 'ng2-charts';
import { ThemeSettingsService } from '../../../vendor/libs/theme-settings/theme-settings.service';

@Component({
  selector: 'charts-ng2-charts', // tslint:disable-line
  templateUrl: './ng2-charts.component.html'
})
export class Ng2ChartsComponent implements AfterViewInit, OnDestroy {
  // Options based on light/dark style
  lineOptions: any;
  barOptions: any;
  radarOptions: any;
  polarAreaOptions: any;
  pieOptions: any;
  doughnutOptions: any;

  constructor(private appService: AppService, private layoutService: LayoutService, themeSettingsService: ThemeSettingsService) {
    this.appService.pageTitle = 'Ng2 Charts - Charts';

    // Options based on light/dark style

    const isDark = themeSettingsService.isDarkStyle();
    const options = {
      responsive: true,
      maintainAspectRatio: false
    };
    const scalesOptions = isDark ? {
      scales: {
        yAxes: [{
          gridLines: { color: '#383b40' },
          ticks: { fontColor: '#fff' }
        }],
        xAxes: [{
          gridLines: { color: '#383b40' },
          ticks: { fontColor: '#fff' }
        }]
      }
    } : {};
    const radialScaleOptions = isDark ? {
      scale: {
        angleLines: { color: '#383b40' },
        gridLines: { color: '#383b40' },
        pointLabels: { fontColor: '#fff' }
      }
    } : {};
    const legendOptions = isDark ? {
      legend: {
        labels: { fontColor: '#fff' }
      }
    } : {};

    this.lineOptions = { ...options, ...scalesOptions, ...legendOptions };
    this.barOptions = { ...options, ...scalesOptions, ...legendOptions };
    this.radarOptions = { ...options, ...radialScaleOptions, ...legendOptions };
    this.polarAreaOptions = { ...options, ...legendOptions };
    this.pieOptions = { ...options, ...legendOptions };
    this.doughnutOptions = { ...options, ...legendOptions };

    if (isDark) {
      this.colors4[0].borderColor = '#22252B';
      this.colors5[0].borderColor = '#22252B';
      this.colors6[0].borderColor = '#22252B';
    }
  }

  data1 = [{
    label:           'My First dataset',
    data:            [43, 91, 89, 16, 21, 79, 28],
    borderWidth:     1,
    borderDash:      [5, 5],
    fill: false
  }, {
    label:           'My Second dataset',
    data:            [24, 63, 29, 75, 28, 54, 38],
    borderWidth:     1,
  }];
  colors1 = [{
    backgroundColor: 'rgba(255, 193, 7, 0.3)',
    borderColor:     '#FFC107',
  }, {
    backgroundColor: 'rgba(233, 30, 99, 0.3)',
    borderColor:     '#E91E63',
  }];


  data2 = [{
    label: '2010 customers #',
    data: [53, 99, 14, 10, 43, 27],
    borderWidth: 1,
  }, {
    label: '2014 customers #',
    data: [55, 74, 20, 90, 67, 97],
    borderWidth: 1,
  }];
  colors2 = [{
    backgroundColor: 'rgba(205, 220, 57, 0.3)',
    borderColor: '#CDDC39'
  }, {
    backgroundColor: 'rgba(103, 58, 183, 0.3)',
    borderColor: '#673AB7'
  }];


  data3 = [{
    label: 'My First dataset',
    data: [39, 99, 77, 38, 52, 24, 89],
    borderWidth: 1
  }, {
    label: 'My Second dataset',
    data: [6, 33, 14, 70, 58, 90, 26],
    borderWidth: 1
  }];
  colors3 = [{
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    borderColor: '#4CAF50',
    pointBackgroundColor: '#4CAF50',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#4CAF50',
  }, {
    backgroundColor: 'rgba(0, 150, 136, 0.3)',
    borderColor: '#009688',
    pointBackgroundColor: '#009688',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#009688',
  }];


  data4 = [{
    data: [ 12, 10, 14, 6, 15 ],
    label: 'My dataset'
  }];
  colors4 = [{
    backgroundColor: [ '#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB' ],
    borderColor: 'white'
  }];


  data5 = [{
    data: [ 180, 272, 100 ],
  }];
  colors5 = [{
    backgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
    hoverBackgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
    borderColor: 'white'
  }];


  data6 = [{
    data: [ 137, 296, 213 ],
  }];
  colors6 = [{
    backgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
    hoverBackgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
    borderColor: 'white'
  }];


  // Resize charts
  //

  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;

  ngAfterViewInit() {
    setTimeout(() => {
      const resizeCharts = () => {
        this.charts.forEach(chart => chart.chart.resize());
      };

      // Initial resize
      resizeCharts();

      // For performance reasons resize charts on delayed resize event
      this.layoutService.on('resize.charts-demo', resizeCharts);
    });
  }

  ngOnDestroy() {
    setTimeout(() => this.layoutService.off('resize.charts-demo'));
  }

}
