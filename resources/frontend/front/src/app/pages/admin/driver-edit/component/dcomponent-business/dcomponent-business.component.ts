import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
declare var $: any;
import { environment } from "../../../../../../environments/environment";
import { v4 as uuidv4 } from 'uuid';
import { ApiService } from "src/app/shared/services/api.service";

@Component({
  selector: "app-dcomponent-business",
  templateUrl: "./dcomponent-business.component.html",
  styles: [
    `
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
    '../../../../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss',
    '../../../../../../vendor/libs/ng-select/ng-select.scss',
  ]
})
export class DcomponentBusinessComponent implements OnInit {
  @Input() userid = 0;
  @Input()
  set data(data) {
    console.log(data);
  }

  perPage = 10;

  filterVal = "";
  currentPage = 1;
  totalItems = 0;
  taskData: object[] = [];

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  today = '';

  constructor(    
    private apiService: ApiService,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar, 
    ) {
      let today = calendar.getToday();
      let year = today.year;
      let month = today.month;
      this.fromDate = new NgbDate(year, month, 1);
      this.toDate = calendar.getNext(this.fromDate, 'm', 1);
      this.today = moment(formatter.format(calendar.getToday())).format('dddd, MMMM Do YYYY');
     }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
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
      page: this.currentPage,
      pagesize: this.perPage,
      driverid: this.userid,
      status: 5,
      from: from,
      to: to
    };
    this.apiService
      .getTaskList(params)
      .then(res => {
        this.taskData = res.data;
        this.totalItems = res.total;
      })
      .catch(err => {});
  }
  update() {
    console.log(this.currentPage);
    this.loadData();
  }
  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

    // Range datepicker
    onDateSelection(date: NgbDate, datepicker: any) {
      if (!this.fromDate && !this.toDate) {
        this.fromDate = date;
      } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
        this.toDate = date;
        datepicker.close();
        this.currentPage = 1;
        this.loadData();
      } else {
        this.toDate = null;
        this.fromDate = date;
      }
    }

    isRange(date: NgbDate) {
      return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
    }
    isHovered(date: NgbDate) {
      return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }
  
    isInside(date: NgbDate) {
      return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
    }
    validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
      const parsed = this.formatter.parse(input);
      return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
    }
}
