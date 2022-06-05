import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "src/app/app.service";
import { AersApiService } from "../../../shared/services/aers-api.service";
import { HttpClient } from "@angular/common/http";
declare var $: any;
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-exhibitor-list",
  templateUrl: "./exhibitor-list.component.html",
  styles: []
})
export class ExhibitorListComponent implements OnInit {
  // Options
  searchKeys = ["id", "account", "email", "name"];
  sortBy = "id";
  sortDesc = true;
  perPage = 10;

  filterVal = "";
  currentPage = 1;
  totalItems = 0;
  usersData: object[] = [];
  originalUsersData: object[] = [];
  driverData = [];
  selectedTask = [];
  intermediate = false;
  checkAll = false;
  downloadLink = `${environment.apiUrl}/aers/event/exportEvents`;
  filterStatus = "";
  eventid = null;
  constructor(
    private http: HttpClient,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: AersApiService,
    private toastrService: ToastrService
  ) {
    this.appService.pageTitle = "AERS: Exhibitor List";
    this.loadData();
  }
  ngOnInit(): void {
    this.eventid = this.route.snapshot.params["id"];
  }

  loadData() {
    let params = {
      page: this.currentPage,
      pagesize: this.perPage,
      search: this.filterVal
    };
    this.apiService
      .getEventList(params)
      .then(res => {
        this.driverData = res.data;
        this.totalItems = res.total;
      })
      .catch(err => {});
  }
  update() {
    console.log(this.currentPage);
    this.loadData();
  }

  onSelectAll(e) {
    let checked = false;
    if (e.target.checked) {
      checked = true;
    }
    if (checked == true) {
      this.driverData.forEach(element => {
        element["checked"] = true;

        this.selectedTask.push(element);
      });
    } else {
      this.driverData.forEach(element => {
        element["checked"] = false;
      });
      this.selectedTask = [];
    }
    this.checkAllStatus();
  }
  checkAllStatus() {
    if (this.selectedTask.length < this.driverData.length) {
      this.intermediate = true;
      this.checkAll = false;
    }
    if (this.selectedTask.length == this.driverData.length) {
      this.intermediate = false;
      this.checkAll = true;
    }
    if (this.selectedTask.length == 0) {
      this.intermediate = false;
      this.checkAll = false;
    }
  }
  onSelectTask(e) {
    let check = false;
    if (e.target.checked) {
      check = true;
    }
    let taskid = e.target.value;
    console.log(taskid, "taskid");
    let index = this.driverData.findIndex(item => {
      return item["id"] == taskid;
    });
    if (check) {
      // insert into array
      this.driverData[index]["checked"] = true;
      if (!this.selectedTask.includes(this.driverData[index])) {
        this.selectedTask.push(this.driverData[index]);
      }
    } else {
      // remove from array
      this.driverData[index]["checked"] = false;
      if (this.selectedTask.includes(this.driverData[index])) {
        //checking weather array contain the id
        this.selectedTask.splice(
          this.selectedTask.indexOf(this.driverData[index]),
          1
        );
      }
    }
    this.checkAllStatus();
  }

  viewExhibitor(userid) {
    this.router.navigate(["admin/driver/show", userid]);
  }
  onCloseScraping() {
    $("#scrapingModal").modal("hide");
  }
  scrapeExhibitor(userid) {}
}
