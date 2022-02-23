import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ApiService } from 'src/app/shared/services/api.service';
declare var $: any;

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styles: [
  ]
})
export class OutboxComponent implements OnInit {

  ngOnInit(): void {
  }
  constructor(
    private http: HttpClient, 
    private appService: AppService,
    private router: Router,
    private apiService: ApiService,
    ) {
    this.appService.pageTitle = 'Outbox';
    this.loadData();
  }

  // Filters

  filterVerified = 'Any';
  filterRole = 'Any';
  filterStatus = 'Any';
  filterLatestActivity = [null, null];


  // Table

  // Options
  filterVal = '';

  perPage = 10;
  currentPage = 1;
  totalItems = 0;

  logData = [];
  delete_id: string;
  logBody = '';
  logTo = '';
  logDate = '';
  logSubject = '';

  loadData() {
    let params = {
      'page': this.currentPage,
      'pagesize': this.perPage,
      'search': this.filterVal,
    };
    this.apiService.getMailLogs(params).then((res) => {
      this.logData = res.data;
      this.totalItems = res.total;
    }).catch((err) => {

    });    
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    this.loadData();
  }

  paginate(data) {
    const perPage = parseInt(String(this.perPage), 10);
    const offset = (this.currentPage - 1) * perPage;

    return data.slice(offset, offset + perPage);
  }

  showContent(id) {
    this.delete_id = id;
    let log = this.logData.find(ele => {return ele.id == id});
    this.logBody = log.body;
    this.logTo = log.to;
    this.logDate = log.date;
    this.logSubject = log.subject;
    $('#logModal').modal('show');
  }

  deleteTemplate() {
    $('#logModal').modal('hide');
  }
}