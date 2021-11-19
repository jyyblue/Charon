import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styles: [
  ]
})
export class CustomerListComponent implements OnInit {

  ngOnInit(): void {
  }
  constructor(
    private http: HttpClient, 
    private appService: AppService,
    private router: Router,
    private apiService: ApiService,
    ) {
    this.appService.pageTitle = 'Customer list - Pages';
    this.loadData();
  }

  // Filters

  filterVerified = 'Any';
  filterRole = 'Any';
  filterStatus = 'Any';
  filterLatestActivity = [null, null];


  // Table

  // Options
  dataUrl = 'assets/json/pages_users_list.json';
  searchKeys = ['id', 'account', 'email', 'name'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 10;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  usersData: object[] = [];
  originalUsersData: object[] = [];
  customerData = [];

  loadData() {
    let params = {
      'page': this.currentPage,
      'pagesize': this.perPage,
      'search': this.filterVal
    };
    this.apiService.getUserList(params).then((res) => {
      this.customerData = res.data;
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

  filter(data) {
    const filter = this.filterVal.toLowerCase();
    return !filter ?
      data.slice(0) :
      data.filter(d => {
        return Object.keys(d)
          .filter(k => this.searchKeys.includes(k))
          .map(k => String(d[k]))
          .join('|')
          .toLowerCase()
          .indexOf(filter) !== -1 || !filter;
      });
  }

  sort(data) {
    data.sort((a: any, b: any) => {
      a = typeof(a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      b = typeof(b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (a < b) { return this.sortDesc ? 1 : -1; }
      if (a > b) { return this.sortDesc ? -1 : 1; }
      return 0;
    });
  }

  paginate(data) {
    const perPage = parseInt(String(this.perPage), 10);
    const offset = (this.currentPage - 1) * perPage;

    return data.slice(offset, offset + perPage);
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
    this.router.navigate(['admin/customer/show', userid]);
  }

  editCustomer(userid) {
    this.router.navigate(['admin/customer/edit', userid]);
  }
}