import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import * as numeral from 'numeral';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-customer-show',
  templateUrl: './customer-show.component.html',
  styles: [
  ]
})
export class CustomerShowComponent implements OnInit {

  private user_id = null;
  constructor(
    private appService: AppService,
    private http: HttpClient, 
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    ) {
    this.appService.pageTitle = 'View user - Pages';
    // this.loadData();
  }
  ngOnInit(): void {
    this.user_id = this.route.snapshot.params['id'];
    this.getData();
  }
  userData = {
    id:null,
    company_name: null,
    account_code: null,
    company_email: null,
    company_phone: null,
    company_address: null,
    company_address2: null,
    company_city: null,
    company_state: null,
    company_postcode: null,

    contact_email: null,
    contact_name: null,
    contact_phone: null,

    pod_email: null,
    pod_name: null,
    pod_password: null,
    
    posts:null,
    followers: null,
    following:null,
  };
  getData() {
    let params = {
      'userid': this.user_id,
    }
    this.apiService.getCustomerDetail(params).then(res => {
      let code = res.code;
      if(code == 200) {
        this.userData = res.data;
      }else{

      }
    }).catch(err => {

    })
  }

  formatInt(v) {
    return numeral(v).format('0,0');
  }

  
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

  usersList: object[] = [];
  originalUsersData: object[] = [];

  loadData() {
    this.http.get(this.dataUrl)
      .subscribe((data: any) => {
        this.originalUsersData = data.slice(0);
        this.update();
      });
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    const data = this.filter(this.originalUsersData);

    this.totalItems = data.length;

    this.sort(data);
    this.usersList = this.paginate(data);
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

  editCustomer() {
    this.router.navigate(['admin/customer/edit', this.user_id]);
  }
}
