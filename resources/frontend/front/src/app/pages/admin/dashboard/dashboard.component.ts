import { AppService } from './../../../app.service';
import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { LayoutAppService } from 'src/app/layout_app/layout_app.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

const now = new Date();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
  .form-group.hidden {
    width: 0;
    margin: 0;
    border: none;
    padding: 0;
  }
  .custom-day {
    text-align: center;
    padding: 0.185rem 0.25rem;
    display: inline-block;
    height: 2rem;
    width: 2rem;
  }
  .custom-day.focused {
    background-color: #e6e6e6;
  }
  .custom-day.range, .custom-day:hover {
    background-color: rgb(2, 117, 216);
    color: white;
  }
  .custom-day.faded {
    background-color: rgba(2, 117, 216, 0.5);
  }
`],
  styleUrls: [
  './dashboard.component.scss',
  '../../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
]
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  c_job = [];
  c_bill = [];
  c_profit = [];
  d_job = [];
  d_bill = [];
  d_profit = [];
  job_count = [];
  customer_ppm = 0;
  driver_ppm = 0;
  total_job = 0;
  profit_sum = 0;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  vehicleLoading = false;
  vehicleOptions = [];
  vehicle_type = 0;

  today = '';
  constructor(
    private appService: AppService,
    private layoutService: LayoutAppService,
    private apiService: ApiService,
    private router: Router,
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter
  ) {
    this.appService.pageTitle = 'Dashboard';
    let today = calendar.getToday();
    let year = today.year;
    let month = today.month;
    this.fromDate = new NgbDate(year, month, 1);
    this.toDate = calendar.getToday(); //calendar.getNext(calendar.getToday(), 'd', 10);
    this.today = moment(formatter.format(calendar.getToday())).format('dddd, MMMM Do YYYY');
  }
  // Chart 1
  //


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
          stepSize: 2
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
    borderColor: '#cd0909'
  }];
  chart1Data = [{
    label: 'Job',
    data: [],
    borderWidth: 1
  }, {
    label: 'Profit',
    data: [],
    borderWidth: 1,
    borderDash: [5, 5]
  }];
  chart1Label = [];
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
    this.loadOptions();
    this.getDashboardData();
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

  loadOptions() {
    this.vehicleLoading = true;
    this.apiService.getJobOptions(null).then(res => {
      this.vehicleOptions = res.vehicle_type;
      this.vehicleLoading = false;
    });
  }

  getDashboardData() {
    let from = '';
    if(this.fromDate != undefined) {
      from = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
      from = moment(from).format('YYYY-MM-DD 00:00:00');
    }
    let to = '';
    if(this.toDate != undefined) {
      to = this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day;
      to = moment(to).format('YYYY-MM-DD 23:59:59');
    }

    let params = {
      'from': from,
      'to': to,
      'vehicle_type': this.vehicle_type
    };
    this.appService.showLoading();
    console.log(params);
    this.apiService.getDashboardData(params).then(res => {
      this.appService.hideLoading();

      this.c_job = res.c_job;
      this.c_bill = res.c_bill;
      this.c_profit = res.c_profit;
      this.d_job = res.d_job;
      this.d_bill = res.d_bill;
      this.d_profit = res.d_profit;
      this.job_count = res.job_count;
      this.customer_ppm = res.customer_ppm;
      this.driver_ppm = res.driver_ppm;
      this.profit_sum = res.profit_sum;
      this.total_job = res.total_job;

      let res_c1Data = res.chart1Data;
      this.chart1Data = [{
        label: 'Job',
        data: res_c1Data.job,
        borderWidth: 1
      }, {
        label: 'Profit',
        data: res_c1Data.profit,
        borderWidth: 1,
        borderDash: [5, 5]
      }];
      this.chart1Label = res_c1Data.label;
    }).catch(err => {

    })
  }

  viewCustomer(id) {
    this.router.navigate(['admin/customer/show', id]);
  }

  viewDriver(id) {
    this.router.navigate(['admin/driver/show', id]);
  }

  // Range datepicker
  onDateSelection(date: NgbDate, datepicker: any) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      datepicker.close();
      this.getDashboardData();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }
  changeVehicle(event) {
    console.log(event);
    if(event != undefined){
      this.vehicle_type = event.value;
    }else{
      this.vehicle_type = 0;
    }
    this.getDashboardData();
  }
}
