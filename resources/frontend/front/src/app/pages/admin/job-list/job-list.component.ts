import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { common as Const } from 'src/app/shared/const/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
const now = new Date();
declare var $: any;
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ComponentChangedEvent } from 'src/app/shared/models/component-changed-event.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styles: ['.job-list-table td{ padding: 2px 2px; border:none;}'],
  styleUrls: [
    '../../../../vendor/libs/ng-select/ng-select.scss',
    '../../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss',
    '../../../../vendor/libs/ngx-dropzone-wrapper/ngx-dropzone-wrapper.scss'
  ]
})
export class JobListComponent implements OnInit {
  dataForm: FormGroup;
  intermediate = false;
  checkAll = false;
  selectedTask = [];
  model: NgbDateStruct = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };
  submitted = false;

  // Filters

  filterVerified = 'Any';
  filterRole = 'Any';
  filterStatus = 0;
  filterLatestActivity = [null, null];


  // Table

  // Options
  sortBy = 'id';
  sortDesc = true;
  perPage = 10;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  taskStatus = [];

  taskData: object[] = [];
  originaltaskData: object[] = [];


  customer_id = 0;
  driver_id = 0;
  job_date = null;
  taskid = 0;
  docket = '';
  c_tprice = '';
  d_tprice = '';
  profit = '';
  created_at = '';

  customerOptions = [];
  customerLoading = false;
  customerPage = 1;
  customerTotal = 0;
  pageSize = Const.PAGE_SIZE;

  driverOptions = [];
  driverLoading = false;
  driverPage = 1;
  driverTotal = 0;

  vehicleOptions = [];
  typeOptions = [];
  vatOptions = [];
  
  constructor(
    private http: HttpClient, 
    private appService: AppService,
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
    ) {


    this.appService.pageTitle = 'User list - Pages';
    this.loadCustomer();
    this.loadDriver();
    this.loadOptions();
    this.loadStatus();
    this.loadData();
  }
  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      payment_date: [this.model, [Validators.required]],
      payment_reference: [null, [Validators.required]],
    });
  }

  get f(): any { return this.dataForm.controls; }

  loadData() {
    let params = {
      'page': this.currentPage,
      'pagesize': this.perPage,
      'status': this.filterStatus,
      'sortBy': this.sortBy,
      'sortDesc': this.sortDesc
    };
    this.apiService.getTaskList(params).then((res) => {
      this.taskData = res.data;
      this.totalItems = res.total;
    }).catch((err) => {

    });
  }

  loadStatus() {
    let params = {};
    this.apiService.getTaskStatus(params).then(res => {
      this.taskStatus = res;
    })
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

  editTask(taskid) {
  }

  onSelectAll(e) {
    if (e.target.checked) {
      this.taskData.forEach(element => {
        element['checked'] = true;
        this.selectedTask.push(element['id']);
      });
    } else {
      this.taskData.forEach(element => {
        element['checked'] = false;
      });
      this.selectedTask = [];
    }
    this.checkAllStatus();

  }
  onSelectTask(e) {
    let taskid = e.target.value;
    let index = this.taskData.findIndex(item => { return item['id'] == taskid; });
    if (e.target.checked) {
      // insert into array
      this.taskData[index]['checked'] = true;
      if (!this.selectedTask.includes(taskid)) {
        this.selectedTask.push(taskid);
      }
    } else {
      // remove from array
      this.taskData[index]['checked'] = false;
      let driver_id = this.taskData[index]['driver_id'];
      if (this.selectedTask.includes(taskid)) {          //checking weather array contain the id
        this.selectedTask.splice(this.selectedTask.indexOf(taskid), 1);
      }
    }
    this.checkAllStatus();
  }

  checkAllStatus() {
    if (this.selectedTask.length < this.taskData.length) {
      this.intermediate = true;
      this.checkAll = false;
    }
    if (this.selectedTask.length == this.taskData.length) {
      this.intermediate = false;
      this.checkAll = true;
    }
    if (this.selectedTask.length == 0) {
      this.intermediate = false;
      this.checkAll = false;
    }
  }

  onPaymentSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.dataForm.invalid) {
      return;
    }
    //True if all the fields are filled
    let payment_date = this.f.payment_date.value; 
    let pd = payment_date.year + "-" + payment_date.month + "-" + payment_date.day;
    let selectedDriver = [];
    this.selectedTask.forEach(taskid => {
        let index = this.taskData.findIndex(item => { return item['id'] == taskid; });
        let task = this.taskData[index];
        let driver_id = task['driver_id'];
        if(!selectedDriver.includes(driver_id)) {
          selectedDriver.push(driver_id);
        }
    });
    let param = {
      'taskids': this.selectedTask,
      'driver_ids': selectedDriver,
      'payment_date': pd,
      'payment_reference': this.f.payment_reference.value,
    };
    this.apiService.updatePendingPaymentTasks(param).then(res=> {
      let code = res.code;
      if(code == 200) {
        this.toastrService.success("Confirmed Payment", "Success");
      }else if(code == 201) {
        let msg = res.message;
        this.toastrService.warning( msg, "Warning");
      }
    });
    if (this.submitted) {
      $("#paymentModal").modal("hide");
    }
  }

  onPaymentClose(e) {
    e.preventDefault();
    this.f.payment_date.setValue(this.model);
    this.f.payment_reference.setValue('');
    $("#paymentModal").modal("hide");
  }

  protected async onSubComponentChange(event: ComponentChangedEvent) {
    let taskid = event.taskid;
    let action = event.action;
    if(action == 'edit') {
      this.router.navigate(['admin/job/edit', taskid]);
    }
  }

  loadCustomer(key = '') {
    this.customerLoading = true;
    let params = {
      'page': this.customerPage,
      'pagesize': this.pageSize,
      'search': key,
    }
    this.apiService.getUserList(params).then((res) => {
      this.customerLoading = false;
      let code = res.code;
      if(code == 200) {
        this.customerOptions = this.customerOptions.concat(res.data);
        this.customerTotal = res.total;
      }
    }).catch(err=>{
      this.customerLoading = false;
    })
  }

  loadDriver(key='') {
    this.driverLoading = true;
    let params = {
      'page': this.customerPage,
      'pagesize': this.pageSize,
      'search': key,
    }
    this.apiService.getDriverList(params).then((res) => {
      this.driverLoading = false;
      let code = res.code;
      if(code == 200) {
        this.driverOptions = this.driverOptions.concat(res.data);
        this.driverTotal = res.total;
      }
    }).catch(err => {
      this.driverLoading = false;
      console.log(err);
    })
  }
  loadOptions() {
    this.apiService.getJobOptions(null).then(res => {
      this.vehicleOptions = res.vehicle_type;
      this.typeOptions = res.driver_type;
      this.vatOptions = res.vat_type;
    });
  }

}