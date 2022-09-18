import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from "src/app/shared/services/api.service";

@Component({
  selector: 'app-dcomponent-history-payment',
  templateUrl: './dcomponent-history-payment.component.html',
  styles: [
  ]
})
export class DcomponentHistoryPaymentComponent implements OnInit {
  @Input() userid = 0;
  perPage = 10;

  filterVal = "";
  currentPage = 1;
  totalItems = 0;
  taskData: object[] = [];

  constructor(    
    private apiService: ApiService,
    ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    let params = {
      page: this.currentPage,
      pagesize: this.perPage,
      driverid: this.userid,
      status: 5,
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
}
