import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/services/api.service';
const now = new Date();

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styles: [
  ]
})
export class JobEditComponent implements OnInit {

  jobId;
  dataForm: FormGroup;
  model: NgbDateStruct = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };
  constructor(
    private route: ActivatedRoute,
    private calendar: NgbCalendar,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.jobId = this.route.snapshot.params['id'];
    this.dataForm = this.formBuilder.group({
      customer_id: [null, Validators.required],
      docket_number: ['', Validators.required],
      job_date: [this.model, Validators.required],
      vehicle_size: [null, Validators.required],
      customer_price: [null, Validators.required],
      customer_vat: [null, []],
      customer_tprice: [null, Validators.required],
      driver_id: [null, Validators.required],
      call_sign: [null, Validators.required],
      type: [null, Validators.required],
      cx_number: [null, []],
      driver_price: [null, Validators.required],
      driver_vat: [null, []],
      driver_tprice: [null, Validators.required],
      invoice_date:  [null, []],
      payment_date:  [null, []],
      invoice_number:  [null, []],
      pod_file: [null, []],
    });
  }
  
  get f(): any { return this.dataForm.controls; }

  getJob() {

  }

    /**
   * change event in invoice date
   * @param event 
   */
     onDateChange(date: NgbDateStruct) {
      let invoice_date:NgbDate = new NgbDate(date.year, date.month, date.day);
     let payment_date = this.calendar.getNext(invoice_date, 'd', 30);
     console.log(payment_date);
     let pd = payment_date.year + "-" + payment_date.month + "-" + payment_date.day;
     let str = moment(pd).format('YYYY-MM-DD')
     this.dataForm.patchValue({'payment_date': str});
    }
 
}
