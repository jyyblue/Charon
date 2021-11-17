import { Component } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'charts-ngx-charts', // tslint:disable-line
  templateUrl: './ngx-charts.component.html',
  styles: [`
    :host ::ng-deep .ngx-charts text {
      fill: #4a4a4a;
    }
    :host ::ng-deep .ngx-charts-outer ngx-charts-legend-entry > .active {
      color: #4a4a4a;
    }
  `, `
    .dark-style :host ::ng-deep .ngx-charts text { fill: #a0aabe; }
    .dark-style :host ::ng-deep .ngx-charts .tooltip-anchor { fill: rgb(255, 255, 255); }
    .dark-style :host ::ng-deep .ngx-charts .gridline-path { stroke: #2f3646; }
    .dark-style :host ::ng-deep .ngx-charts .refline-path { stroke: #455066; }
    .dark-style :host ::ng-deep .ngx-charts .reference-area { fill: #fff; }
    .dark-style :host ::ng-deep .ngx-charts .grid-panel.odd rect { fill: rgba(255, 255, 255, 0.05); }
    .dark-style :host ::ng-deep .ngx-charts .number-card p { color: #f0f1f6; }
    .dark-style :host ::ng-deep .ngx-charts .gauge .background-arc path { fill: #2f3646; }
    .dark-style :host ::ng-deep .ngx-charts .gauge .gauge-tick path { stroke: #a0aabe; }
    .dark-style :host ::ng-deep .ngx-charts .gauge .gauge-tick text { fill: #a0aabe; }
    .dark-style :host ::ng-deep .ngx-charts .linear-gauge .background-bar path { fill: #2f3646; }
    .dark-style :host ::ng-deep .ngx-charts .linear-gauge .units { fill: #72809b; }
    .dark-style :host ::ng-deep .ngx-charts .timeline .brush-background { fill: rgba(255, 255, 255, 0.05); }
    .dark-style :host ::ng-deep .ngx-charts .timeline .brush .selection {
    .dark-style :host ::ng-deep .ngx-charts   fill: rgba(255, 255, 255, 0.1);
    .dark-style :host ::ng-deep .ngx-charts   stroke: #aaa;
    .dark-style :host ::ng-deep .ngx-charts }
    .dark-style :host ::ng-deep .ngx-charts .polar-chart .polar-chart-background { fill: rgb(30, 34, 46); }
    .dark-style :host ::ng-deep .chart-legend .legend-labels { background: rgba(255, 255, 255, 0.05) !important; }
    .dark-style :host ::ng-deep .chart-legend .legend-item:hover { color: #fff; }
    .dark-style :host ::ng-deep .chart-legend .legend-label:hover { color: #fff !important; }
    .dark-style :host ::ng-deep .chart-legend .legend-label .active .legend-label-text { color: #fff !important; }
    .dark-style :host ::ng-deep .chart-legend .scale-legend-label { color: #a0aabe; }
  `]
})
export class NgxChartsComponent {
  constructor(private appService: AppService) {
    this.appService.pageTitle = 'Ngx Charts - Charts';
  }

  colors = {
    domain: ['#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a', '#a7b61a', '#f3e562', '#ff9800', '#ff5722', '#ff4514']
  };

  singleData = [{
    name: 'Germany',
    value: 40632
  }, {
    name: 'United States',
    value: 49737
  }, {
    name: 'France',
    value: 36745
  }, {
    name: 'United Kingdom',
    value: 36240
  }, {
    name: 'Spain',
    value: 33000
  }, {
    name: 'Italy',
    value: 35800
  }];

  multiData = [{
    name: 'Germany',
    series: [{
      name: '1990',
      value: 31476
    }, {
      name: '2000',
      value: 36953
    }, {
      name: '2010',
      value: 40632
    }]
  }, {
    name: 'United States',
    series: [{
      name: '1990',
      value: 37060
    }, {
      name: '2000',
      value: 45986
    }, {
      name: '2010',
      value: 49737
    }]
  }, {
    name: 'France',
    series: [{
      name: '1990',
      value: 29476
    }, {
      name: '2000',
      value: 34774
    }, {
      name: '2010',
      value: 36745
    }]
  }, {
    name: 'United Kingdom',
    series: [{
      name: '1990',
      value: 26424
    }, {
      name: '2000',
      value: 32543
    }, {
      name: '2010',
      value: 36240
    }]
  }];
}
