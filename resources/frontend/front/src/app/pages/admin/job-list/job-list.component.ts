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
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styles: ['.job-list-table td{ padding: 2px 2px; border:none;}'],
  styleUrls: [
    './job-list.component.scss',
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
  paymentData = [];
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

  newJob = false;

  resolveForm: FormGroup;
  submitted3 = false;

  disputeForm: FormGroup;
  submitted2 = false;
  data = new Task();

  // dispute, resolve task
  summernote_content;
  suggestItems = [];
  editor;
  typeList = [];


  resolve_content;
  resolve_editor;
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
      total_payment: [null, [Validators.required]],
    });
    this.disputeForm = this.formBuilder.group({
      type_slug: [null, [Validators.required]],
    });

    this.resolveForm = this.formBuilder.group({
      description: [null, [Validators.required]],
    });
  }

  get f(): any { return this.dataForm.controls; }
  get df(): any { return this.disputeForm.controls; }
  get rf(): any { return this.resolveForm.controls; }

  loadData() {
    let params = {
      'page': this.currentPage,
      'pagesize': this.perPage,
      'status': this.filterStatus,
      'sortBy': this.sortBy,
      'sortDesc': this.sortDesc,
      'filterVal': this.filterVal,
    };
    this.apiService.getTaskList(params).then((res) => {
      this.appService.hideLoading();
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
    this.appService.showLoading();
    this.loadData();
  }

  updateFilter() {
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

  onSelectAll(checked) {
    if (checked == true) {
      this.taskData.forEach(element => {
        element['checked'] = true;

        this.selectedTask.push(element);
        this.generatePaymentData();
      });
    } else {
      this.taskData.forEach(element => {
        element['checked'] = false;
      });
      this.selectedTask = [];
      this.generatePaymentData();
    }
    this.checkAllStatus();
  }
  onSelectTask(taskid, check) {
    let index = this.taskData.findIndex(item => { return item['id'] == taskid; });
    if (check) {
      // insert into array
      this.taskData[index]['checked'] = true;
      if (!this.selectedTask.includes(this.taskData[index])) {
        this.selectedTask.push(this.taskData[index]);
        this.generatePaymentData();
      }
    } else {
      // remove from array
      this.taskData[index]['checked'] = false;
      let driver_id = this.taskData[index]['driver_id'];
      if (this.selectedTask.includes(this.taskData[index])) {          //checking weather array contain the id
        this.selectedTask.splice(this.selectedTask.indexOf(this.taskData[index]), 1);
        this.generatePaymentData();
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

  changeTotalPayment() {
    let total_payment = this.f.total_payment.value;
    this.f.total_payment.setValue(total_payment.toFixed(2));
  }
  generatePaymentData() {
    this.paymentData = [];
    let paymentTotalPayment = 0;
    console.log('generatePaymentData');
    this.selectedTask.forEach(task => {
      let item = {
        'taskids': [task.id],
        'driver_id': task.driver_id,
        'payment_reference': null,
        'total_payment': task.d_price,
        'driver': task.driver,
      };
      let existIndex = this.paymentData.findIndex(pdata => {return pdata.driver_id == task.driver_id});
      if(existIndex == -1) {
        this.paymentData.push(item);
      }else{
        this.paymentData[existIndex]['taskids'].push(task.id);
        this.paymentData[existIndex]['total_payment'] += task.d_price;
      }
      paymentTotalPayment += task.d_price;
    });
    this.f.total_payment.setValue(paymentTotalPayment.toFixed(2));
  };
  showPaymentModal() {
    // preprocessing
    console.log('payment modal');
    $('#paymentModal').modal('show');
  }
  onPaymentSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.dataForm.invalid) {
      return;
    }
    let isRefValid = true;
    this.paymentData.forEach(pData => {
      let reference = pData.payment_reference;
      if(!reference) {
        pData['error'] = {
          'payment_reference': 'This fiedl is required',
        }
        isRefValid = false;
      }else{
        pData['error'] = {}
      }
    });
    if(!isRefValid){
      return ;
    }
    //True if all the fields are filled
    let payment_date = this.f.payment_date.value;
    let pd = payment_date.year + "-" + payment_date.month + "-" + payment_date.day;

    let param = {
      'payment_date': pd,
      'total_payment': this.f.total_payment.value,
      'data': this.paymentData
    };
    this.appService.showLoading();
    this.apiService.updatePendingPaymentTasks(param).then(res => {
      this.appService.hideLoading();
      let code = res.code;
      if (code == 200) {
        this.toastrService.success("Confirmed Payment", "Success");
        this.loadData();
      } else if (code == 201) {
        let msg = res.message;
        // let tasks = res.tasks;
        // tasks.forEach(element => {
        //   let taskid = element.id;
        //   let taskIdx = this.taskData.findIndex(item => { return item['id'] == taskid; });
        //   this.taskData[taskIdx] = element;
        // });
        this.toastrService.warning(msg, "Warning");
      }
    });
    if (this.submitted) {
      $("#paymentModal").modal("hide");
    }
  }

  onPaymentClose(e) {
    e.preventDefault();
    this.f.payment_date.setValue(this.model);
    this.f.total_payment.setValue(0);
    $("#paymentModal").modal("hide");
  }

  async onSubComponentChange(event: ComponentChangedEvent) {
    let taskid = event.taskid;
    let action = event.action;

    console.log(event);
    if (action == 'edit') {
      this.router.navigate(['admin/job/edit', taskid]);
    } else if (action == 'update') {
      let data = event.entity;
      let taskIdx = this.taskData.findIndex(item => { return item['id'] == taskid; });
      let task_old = this.taskData[taskIdx];
      this.taskData[taskIdx] = data;
      this.toastrService.success('Updated Successfully!');
    } else if (action == 'add') {
      // add new task at top of job list or refresh
      let task = event.entity;
      // this.taskData.unshift(task);
      this.loadData();
      this.newJob = false;
    } else if (action == 'cancel_new_task') {
      this.newJob = false;
    } else if (action == 'check') {
      let check = event.field;
      let checked = check == 'true' ? true : false;
      this.onSelectTask(taskid, checked);
    } else if (action == 'check_all') {
      let check = event.field;
      let checked = check == 'true' ? true : false;
      this.onSelectAll(checked);
    } else if (action == 'setSort') {
      let key = event.field;
      this.setSort(key);
    } else if (action == 'dispute') {
      let data = event.entity;
      this.data = data;
      $('#disputeModal').modal('show');
    } else if (action == 'resolve') {
      let data = event.entity;
      this.data = data;
      $('#resolveModal').modal('show');
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
      if (code == 200) {
        this.customerOptions = this.customerOptions.concat(res.data);
        this.customerTotal = res.total;
      }
    }).catch(err => {
      this.customerLoading = false;
    })
  }

  loadDriver(key = '') {
    this.driverLoading = true;
    let params = {
      'page': this.customerPage,
      'pagesize': this.pageSize,
      'search': key,
    }
    this.apiService.getDriverList(params).then((res) => {
      this.driverLoading = false;
      let code = res.code;
      if (code == 200) {
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

      this.typeList = res.disputeTemplates;
      this.suggestItems = res.suggestItems;
      this.initSummernote();

      let resolveTemplate = res.resolveTemplate;
      this.resolve_content = resolveTemplate != undefined ? resolveTemplate.content : '';
      this.initResolveSummernote();

    });
  }

  addJob(flag) {
    this.newJob = true;
  }

  disputeTask() {
    this.submitted2 = true;

    let summernote_valid = false;
    if (this.editor != undefined) {
      let summernote_content = this.editor.summernote('code');
      let text = $(summernote_content).text();
      summernote_valid = summernote_content.length > 0 ? true : false;
    }
    if (summernote_valid == false) {
      $('#summernote-error').css('display', 'inline-block');
      return;
    }

    // stop here if form is invalid
    if (this.disputeForm.invalid) {
      return;
    }

    let params = {
      'taskid': this.data.id,
      'content': this.summernote_content,
      'type_slug': this.df.type_slug.value
    };
    this.appService.showLoading();
    this.apiService.disputeTask(params).then(res => {
      this.appService.hideLoading();
      let code = res.code;
      if (code == 200) {
        this.toastrService.warning('Dispute Job!', 'Success', {
          timeOut: 1500,
        });
        $('#disputeModal').modal('hide');
        let temp = res.task;
        let taskid = temp.id;
        let taskIdx = this.taskData.findIndex(item => { return item['id'] == taskid; });
        this.taskData[taskIdx] = temp;
        // this.getJob();
        // this.updateJobList(res.task);
      } else {
        this.toastrService.error('Something wrong!', 'Error', {
          timeOut: 1500,
        });
      }
    });
  }

  onDisputeClose() {
    this.summernote_content = '';
    $('#disputeModal').modal('hide');
  }
  // resolve query 
  resolveTask() {
    this.submitted3 = true;

    let summernote_valid = false;
    if (this.resolve_editor != undefined) {
      let summernote_content = this.resolve_editor.summernote('code');
      let text = $(summernote_content).text();
      summernote_valid = summernote_content.length > 0 ? true : false;
    }
    if (summernote_valid == false) {
      $('#resolve-summernote-error').css('display', 'inline-block');
      return;
    }


    let params = {
      'taskid': this.data.id,
      'content': this.resolve_content
    };
    this.appService.showLoading();
    this.apiService.resolveDisputeTask(params).then(res => {
      this.appService.hideLoading();
      let code = res.code;
      if (code == 200) {
        this.toastrService.success('Resolve dispute successfully!', 'Success', {
          timeOut: 1500,
        });
        $('#resolveModal').modal('hide');
        let temp = res.task;
        let taskid = temp.id;
        let taskIdx = this.taskData.findIndex(item => { return item['id'] == taskid; });
        let task_old = this.taskData[taskIdx];
        this.taskData[taskIdx] = temp;
      } else {
        this.toastrService.error('Something wrong!', 'Error', {
          timeOut: 1500,
        });
      }
    });
  }
  onResolveClose() {
    this.rf.description.setValue('');
    $('#resolveModal').modal('hide');
  }

  changeDisputeTemplate() {
    let type_slug = this.df.type_slug.value;
    let item = this.typeList.find(element => {
      return element.type_slug == type_slug;
    });
    this.summernote_content = item.content;
  }

  initSummernote() {
    let self = this;
    let search = function (keyword) {
      var result = [];
      for (let id = 0; id < self.suggestItems.length; id++) {
        let item = self.suggestItems[id];
        if (item.match(new RegExp(keyword))) {
          result.push(item);
        }
      }
      return result;
    }

    this.editor = $("#summernote-content").summernote({
      height: 200,
      callbacks: {
        onInit: function () {
          console.log('Summernote is launched');
        },
        onChange: function (contents, $editable) {
          console.log('onChange:', contents, $editable);
          $('#summernote-error').css('display', 'none');
        }
      }
    });
    this.editor.summernote('autoComplete.setDataSrc', function (keyword, callback) {
      callback(search(keyword));
    }, "{");
    this.editor.summernote('autoComplete.on', 'insertSuggestion', function (suggestion) {
      console.log("The uesr has get the suggestion:" + suggestion);
    })
  }

  initResolveSummernote() {
    let self = this;
    let resolve_search = function (keyword) {
      var result = [];
      for (let id = 0; id < self.suggestItems.length; id++) {
        let item = self.suggestItems[id];
        if (item.match(new RegExp(keyword))) {
          result.push(item);
        }
      }
      return result;
    }

    this.resolve_editor = $("#resolve-summernote-content").summernote({
      height: 200,
      callbacks: {
        onInit: function () {
          console.log('Summernote is launched');
        },
        onChange: function (contents, $editable) {
          console.log('onChange:', contents, $editable);
          $('#resolve-summernote-error').css('display', 'none');
        }
      }
    });
    this.resolve_editor.summernote('autoComplete.setDataSrc', function (keyword, callback) {
      callback(resolve_search(keyword));
    }, "{");
    this.resolve_editor.summernote('autoComplete.on', 'insertSuggestion', function (suggestion) {
      console.log("The uesr has get the suggestion:" + suggestion);
    })
  }
}