import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';
const now = new Date();
declare var $: any;

@Component({
  selector: 'app-job-edit-pending',
  templateUrl: './job-edit-pending.component.html',
  styles: [
  ]
})
export class JobEditPendingComponent implements OnInit {
  submitted = false;
  taskid: string;
  task : any = {};
  dataForm: FormGroup;
  model: NgbDateStruct = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };
  disputeForm: FormGroup;
  submitted2 = false;

  constructor(
    private route: ActivatedRoute,
    private calendar: NgbCalendar,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.taskid = this.route.snapshot.params['id'];
    this.dataForm = this.formBuilder.group({
      invoice_date: [null, [Validators.required]],
      payment_date: [null, []],
      invoice_number: [null, [Validators.required]],
      pod_file: [null, []],
    });
    this.disputeForm = this.formBuilder.group({
      description: [null, [Validators.required]],
    });
    this.getDetail();
  }

  get f(): any { return this.dataForm.controls; }
  get df(): any { return this.disputeForm.controls; }

  getDetail() {
    let params = {
      'taskid': this.taskid
    }

    this.apiService.getTaskDetail(params).then((res) => {
      let code = res.code;
      if (code == '200') {
        this.task = res.data;
        let iv = moment(this.task.invoice_date);
        this.model = {
          year: iv.year(),
          month: iv.month() + 1,
          day: iv.date()
        };
        this.dataForm = this.formBuilder.group({
          invoice_date: [this.model, [Validators.required]],
          payment_date: [this.task.payment_date, [Validators.required]],
          invoice_number: [this.task.invoice_number, [Validators.required]]
        });
      }
    });
  }

  savePending() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dataForm.invalid) {
      return;
    }

    let invoice_date = this.f.invoice_date.value; 
    let id = invoice_date.year + "-" + invoice_date.month + "-" + invoice_date.day;

    let param = {
      'invoice_date': id,
      'payment_date': this.f.payment_date.value,
      'invoice_number': this.f.invoice_number.value,
      'taskid': this.taskid
    }
    this.apiService.updatePendingTask(param).then(res => {
      let code = res.code;
      if(code == 200) {
        this.toastrService.success('Job updated successfully!', 'Success', {
          timeOut: 1500,
        });
      }else{
        let message = res.msg;
        this.toastrService.error(message, 'Error', {
          timeOut: 1500,
        });
      }
    })
  }
  /**
* change event in invoice date
* @param event 
*/
  onDateChange(date: NgbDateStruct) {
    let invoice_date: NgbDate = new NgbDate(date.year, date.month, date.day);
    let payment_date = this.calendar.getNext(invoice_date, 'd', 30);
    let pd = payment_date.year + "-" + payment_date.month + "-" + payment_date.day;
    let str = moment(pd).format('YYYY-MM-DD')
    this.dataForm.patchValue({ 'payment_date': str });
  }
  disputeTask() {
    this.submitted2 = true;
    // stop here if form is invalid
    if (this.disputeForm.invalid) {
      return;
    }
    
    let params = {
      'taskid': this.taskid,
      'description': this.df.description.value
    };
    this.apiService.disputeTask(params).then(res => {
      let code = res.code;
      if(code == 200) {
        this.toastrService.warning('Dispute Job!', 'Success', {
          timeOut: 1500,
        });
        $('#disputeModal').modal('hide');
        this.getDetail();
      }else{
        this.toastrService.error('Something wrong!', 'Error', {
          timeOut: 1500,
        });
      }
    });
  }

  onDisputeClose() {
    this.df.description.setValue('');
    $('#disputeModal').modal('hide');
  }
}
