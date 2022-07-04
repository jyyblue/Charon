import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from "src/app/shared/services/api.service";

@Component({
  selector: 'app-dcomponent-history-job',
  templateUrl: './dcomponent-history-job.component.html',
  styles: [
  ]
})
export class DcomponentHistoryJobComponent implements OnInit {
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
      driverid: this.userid
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