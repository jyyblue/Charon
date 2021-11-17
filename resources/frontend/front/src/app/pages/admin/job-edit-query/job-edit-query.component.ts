import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';
const now = new Date();
declare var $: any;

@Component({
  selector: 'app-job-edit-query',
  templateUrl: './job-edit-query.component.html',
  styles: [
  ]
})
export class JobEditQueryComponent implements OnInit {
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
      payment_date: [null, [Validators.required]],
      payment_reference: [null, [Validators.required]],
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
        let iv = moment(this.task.payment_date);
        this.model = {
          year: iv.year(),
          month: iv.month() + 1,
          day: iv.date()
        };
        this.dataForm = this.formBuilder.group({
          payment_date: [this.model, [Validators.required]],
          payment_reference: [this.task.payment_reference, [Validators.required]]
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

    let payment_date = this.f.payment_date.value; 
    let pd = payment_date.year + "-" + payment_date.month + "-" + payment_date.day;

    let param = {
      'payment_date': pd,
      'payment_reference': this.f.payment_reference.value,
      'taskids': [this.taskid]
    }
    this.apiService.updatePendingPaymentTasks(param).then(res => {
      let code = res.code;
      if(code == 200) {
        this.toastrService.success('Job updated successfully!', 'Success', {
          timeOut: 1500,
        });
        this.getDetail();
      }else{
        let message = res.msg;
        this.toastrService.error(message, 'Error', {
          timeOut: 1500,
        });
      }
    })
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
    this.apiService.resolveDisputeTask(params).then(res => {
      let code = res.code;
      if(code == 200) {
        this.toastrService.success('Resolve dispute successfully!', 'Success', {
          timeOut: 1500,
        });
        $('#resolveModal').modal('hide');
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
    $('#resolveModal').modal('hide');
  }
}
