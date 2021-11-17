import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as numeral from 'numeral';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-driver-show',
  templateUrl: './driver-show.component.html',
  styleUrls: ['../../../../vendor/styles/pages/users.scss']
})
export class DriverShowComponent implements OnInit {

  private user_id = null;
  constructor(
    private appService: AppService,
    private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.appService.pageTitle = 'View Driver - Pages';
    this.loadData();
  }
  ngOnInit(): void {
    this.user_id = this.route.snapshot.params['id'];
  }
  userData = {
    avatar: '5-small.png',
    name: 'Nelle Maxwell',
    username: 'nmaxwell',
    email: 'nmaxwell@mail.com',
    company: 'Company Ltd.',
    id: 3425433,
    registered: '01/23/2017',
    latestActivity: '01/23/2018',
    verified: true,
    role: 1,
    status: 1,

    permissions: [
      { module: 'Users', read: true, write: false, create: false, delete: false },
      { module: 'Articles', read: true, write: true, create: true, delete: false },
      { module: 'Staff', read: false, write: false, create: false, delete: false }
    ],

    // Statistics
    posts: 25,
    followers: 534,
    following: 236,

    info: {
      birthday: 'May 3, 1995',
      country: 'Canada',
      languages: ['English'],
      phone: '+0 (123) 456 7891',
      website: '',
      music: ['Rock', 'Alternative', 'Electro', 'Drum & Bass', 'Dance'],
      movies: [
        'The Green Mile', 'Pulp Fiction', 'Back to the Future', 'WALL·E',
        'Django Unchained', 'The Truman Show', 'Home Alone', 'Seven Pounds'
      ],

      twitter: 'https://twitter.com/user',
      facebook: 'https://www.facebook.com/user',
      google: '',
      linkedin: '',
      instagram: 'https://www.instagram.com/user'
    }
  };

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

  editDriver() {
    this.router.navigate(['admin/driver/edit', 1]);
  }
}
