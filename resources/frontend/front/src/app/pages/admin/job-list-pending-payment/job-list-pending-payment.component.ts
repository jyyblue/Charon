import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { ApiService } from 'src/app/shared/services/api.service';
const now = new Date();
declare var $: any;

@Component({
  selector: 'app-job-list-pending-payment',
  templateUrl: './job-list-pending-payment.component.html',
  styles: [
  ]
})
export class JobListPendingPaymentComponent implements OnInit {
  // Filters

  filterDriver = '0';
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

  driverList = [];

  selectedTask = [];
  // modal 
  dataForm: FormGroup;

  model: NgbDateStruct = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };
  submitted = false;
  // checkbox 

  intermediate = false;
  checkAll = false;

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      payment_date: [this.model, [Validators.required]],
      payment_reference: [null, [Validators.required]],
    });
  }

  get f(): any { return this.dataForm.controls; }

  constructor(
    private appService: AppService,
    private router: Router,
    private apiService: ApiService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.appService.pageTitle = 'Task list - Pages';
    this.loadData();
    this.getDriver();
  }
  getDriver() {
    let params = {};
    this.apiService.getDriverList(params).then((res) => {
      this.driverList = res.data;
    }).catch((err) => {

    });
  }

  loadData() {
    let params = {
      'page': this.currentPage,
      'pagesize': this.perPage,
      'driverid': this.filterDriver,
      'status': 3
    };
    this.apiService.getTaskList(params).then((res) => {
      this.taskData = res.data;
      this.taskData.forEach(element => {
        element['checked'] = false;
      });
      this.intermediate = false;
      this.checkAll = false;
      this.selectedTask = [];
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
    this.router.navigate(['admin/job/edit-pending-payment', taskid]);
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

  ConfirmPayment() {

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
}