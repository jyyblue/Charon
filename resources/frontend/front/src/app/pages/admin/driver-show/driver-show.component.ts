import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "src/app/app.service";
import { ApiService } from "src/app/shared/services/api.service";
import { common as Const } from "src/app/shared/const/common";

@Component({
  selector: "app-driver-show",
  templateUrl: "./driver-show.component.html",
  styleUrls: [
    "../../../../vendor/styles/pages/users.scss",
    "./driver-show.component.scss"
  ]
})
export class DriverShowComponent implements OnInit {
  private userid = null;
  constructor(
    private appService: AppService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.appService.pageTitle = "View Driver - Pages";
  }
  ngOnInit(): void {
    this.userid = this.route.snapshot.params["id"];
    this.getData();
    this.loadData();
  }
  userData = {
    id: null,
    subcontractor: null,
    first_name: null,
    last_name: null,
    email: null,
    phone_number: null,
    call_sign: null,
    type: null,
    cx_number: null,
    address: null,
    address2: null,
    city: null,
    state: null,
    postcode: null,
    vat: null,
    vat_number: null,
    bank_name: null,
    bank_sort_code: null,
    bank_account_number: null,
    payee_name: null,
    driver_type: null,
    vat_item: null,
    posts: null,
    followers: null,
    following: null
  };
  getData() {
    let params = {
      user_id: this.userid
    };
    this.apiService
      .getDriverDetail(params)
      .then(res => {
        let code = res.code;
        if (code == 200) {
          // this.typeOptions = res.driver_type;
          // this.vatOptions = res.vat_type;
          this.userData = res.data;
        }
      })
      .catch(err => {
        let status = err.status;
      });
  }

  // Table

  // Options
  dataUrl = "assets/json/pages_users_list.json";
  searchKeys = ["id", "account", "email", "name"];
  sortBy = "id";
  sortDesc = true;
  perPage = 10;

  filterVal = "";
  currentPage = 1;
  totalItems = 0;
  taskData: object[] = [];
  originalUsersData: object[] = [];

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
  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    console.log(this.currentPage);
    this.loadData();
  }

  filter(data) {
    const filter = this.filterVal.toLowerCase();
    return !filter
      ? data.slice(0)
      : data.filter(d => {
          return (
            Object.keys(d)
              .filter(k => this.searchKeys.includes(k))
              .map(k => String(d[k]))
              .join("|")
              .toLowerCase()
              .indexOf(filter) !== -1 || !filter
          );
        });
  }

  sort(data) {
    data.sort((a: any, b: any) => {
      a =
        typeof a[this.sortBy] === "string"
          ? a[this.sortBy].toUpperCase()
          : a[this.sortBy];
      b =
        typeof b[this.sortBy] === "string"
          ? b[this.sortBy].toUpperCase()
          : b[this.sortBy];

      if (a < b) {
        return this.sortDesc ? 1 : -1;
      }
      if (a > b) {
        return this.sortDesc ? -1 : 1;
      }
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
    this.router.navigate(["admin/driver/edit", this.userid]);
  }

  editTask(taskid) {
    this.router.navigate(["admin/job/edit", taskid, Const.PREV_PAGE.ALL]);
  }
}
