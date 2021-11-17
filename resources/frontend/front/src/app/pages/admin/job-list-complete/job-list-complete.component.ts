import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-job-list-complete',
  templateUrl: './job-list-complete.component.html',
  styles: [
  ]
})
export class JobListCompleteComponent implements OnInit {

  ngOnInit(): void {
  }
  constructor(
    private appService: AppService,
    private router: Router,
    private apiService: ApiService,
    ) {
    this.appService.pageTitle = 'User list - Pages';
    this.loadData();
  }

  // Filters

  filterVerified = 'Any';
  filterRole = 'Any';
  filterStatus = 'Any';
  filterLatestActivity = [null, null];


  // Table

  // Options
  searchKeys = ['id', 'account', 'email', 'name'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 10;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  taskData: object[] = [];
  originaltaskData: object[] = [];

  loadData() {
    let params = {
      'page': this.currentPage,
      'pagesize': this.perPage,
      'status': 4
    };
    this.apiService.getTaskList(params).then((res) => {
      this.taskData = res.data;
      this.totalItems = res.total;
    }).catch((err) => {

    });
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    console.log(this.currentPage);
    this.loadData();
  }

  setSort(key) {
    if (this.sortBy !== key) {
      this.sortBy = key;
      this.sortDesc = false;
    } else {
      this.sortDesc = !this.sortDesc;
    }

    this.currentPage = 1;
    this.update();
  }

  viewProfile(userid) {
    console.log(userid);
    this.router.navigate(['admin/job/show', 1]);
  }

  editPendingTask(taskid) {
    this.router.navigate(['admin/job/edit-pending', taskid]);
  }
}