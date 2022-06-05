import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "src/app/app.service";
import { AersApiService } from "../../../shared/services/aers-api.service";
import { HttpClient } from "@angular/common/http";
declare var $: any;
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styles: []
})
export class EventListComponent implements OnInit {
  dataForm: FormGroup;
  submitted = false;

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
  filterStatus = '';
  constructor(
    private http: HttpClient,
    private appService: AppService,
    private router: Router,
    private apiService: AersApiService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.appService.pageTitle = "AERS Event List";
    this.loadData();
  }
  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      url: [null, [Validators.required]],
      username: [null, [Validators.required]],
      code: [null, [Validators.required]]
    });
  }
  get f(): any {
    return this.dataForm.controls;
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
  showScrapingModal() {
    this.appService.showLoading();
    this.apiService.getScrapeSetting(null).then(res => {
      this.appService.hideLoading();
      let code = res.code;
      if (code == 200) {
        let setting = res.setting;
        this.f.url.setValue(setting.url);
        this.f.username.setValue(setting.username);
        this.f.code.setValue(setting.code);
        $("#scrapingModal").modal("show");
      } else {
        this.toastrService.error("Something wrong!", "Error", {
          timeOut: 1500
        });
      }
    });
  }

  startScraping() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.dataForm.invalid) {
      return;
    }

    let params = {
      url: this.f.url.value,
      username: this.f.username.value,
      code: this.f.code.value
    };
    this.appService.showLoading();
    this.apiService.scrapeEvents(params).then(res => {
      this.appService.hideLoading();
      let code = res.code;
      if (code == 200) {
        this.toastrService.warning("Finish Scraping Job!", "Success", {
          timeOut: 1500
        });
        $("#scrapingModal").modal("hide");
        this.update();
      } else {
        this.toastrService.error("Something wrong!", "Error", {
          timeOut: 1500
        });
      }
    });
  }
  viewExhibitor(userid) {
    this.router.navigate(["aers/exhibitor-list", userid]);
  }
  onCloseScraping() {
    $("#scrapingModal").modal("hide");
  }
  scrapeExhibitor(userid) {}
}
