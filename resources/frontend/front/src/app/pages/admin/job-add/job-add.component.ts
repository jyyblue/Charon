import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
const now = new Date();
declare var $: any;

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styles: [
    '.price-table td{ padding: 0px; border:none;}'
  ],
  styleUrls: [
    '../../../../vendor/libs/ng-select/ng-select.scss',
    '../../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss',
    '../../../../vendor/libs/ngx-dropzone-wrapper/ngx-dropzone-wrapper.scss'
  ]
})
export class JobAddComponent implements OnInit {
  @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;


  dataForm: FormGroup;
  data: any;

  customerOptions = [];
  customerLoading = false;
  customerPage = 1;
  customerTotal = 0;

  driverOptions = [];
  driverLoading = false;
  driverPage = 1;
  driverTotal = 0;

  vehicleOptions = [];
  vehicleLoading = false;
  pageSize = 50;

  journey=[];
  journeyError = false;

  typeOptions = [];

  vatOptions = [];

  model: NgbDateStruct = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };
  dropzoneConfig = {};
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private calendar: NgbCalendar,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    const token = "this.authService.getToken()";
    this.dropzoneConfig = {
      url: `${environment.apiUrl}/admin/v1/user/upload`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      maxFiles: 1,
      addRemoveLinks: true,
      // acceptedFiles: '*/*',
      // autoReset: 20000,
      previewTemplate: `
        <div class="dz-preview dz-file-preview" style="width: 11.25rem;">
          <div class="dz-details">
            <div class="dz-thumbnail">
              <img data-dz-thumbnail>
              <span class="dz-nopreview">No preview</span>
              <div class="dz-success-mark" style="background-color: rgba(24,28,33,.1);"></div>
              <div class="dz-error-mark" style="background-color: rgba(24,28,33,.1);"></div>
              <div class="dz-error-message"><span data-dz-errormessage></span></div>
              <div class="progress">
                <div class="progress-bar progress-bar-primary"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  data-dz-uploadprogress></div>
              </div>
            </div>
            <div class="dz-filename" data-dz-name></div>
            <div class="dz-size" data-dz-size></div>
          </div>
        </div>`
    };
  }

  ngOnInit(): void {
    this.data = {
      checkvat: true,
      checkprice: false,
      checkbank: true,
      checkoff: false,
    }
    this.loadCustomer();
    this.loadDriver();
    this.loadOptions();
    this.dataForm = this.formBuilder.group({
      customer_id: [null, Validators.required],
      docket: ['', Validators.required],
      job_date: [this.model, Validators.required],
      vehicle_type: [null, Validators.required],
      c_price: [0, Validators.required],
      c_vat: [null, []],
      c_price_total: [0, []],
      c_extra: [0, []],
      c_extra_vat: [null, []],
      c_extra_total: [0, []],
      c_net: [0, []],
      c_vat_total: [0,[]],
      c_tprice: [0, Validators.required],

      driver_id: [null, Validators.required],
      job_ref: [null, Validators.required],
      call_sign: [null, Validators.required],
      driver_type: [null, Validators.required],
      cx_number: [null, []],
      driver_vehicle: [null, []],
      d_price: [0, Validators.required],
      d_vat: [null, []],
      d_price_total: [0, []],
      d_extra: [0, []],
      d_extra_vat: [null, []],
      d_extra_total: [0, []],
      d_net: [0, []],
      d_vat_total: [0,[]],
      d_tprice: [0, Validators.required],

      invoice_date: [null, []],
      invoice_received_date: [null, []],
      payment_date: [null, []],
      invoice_number: [null, []],
      pod_file: [null, []],
    });
  }

  get f(): any { return this.dataForm.controls; }

  saveTask() {
    this.submitted = true;
    if(this.validateJourney()) {
      return;
    }
    if(this.dataForm.invalid){
      return;
    }
    let job_date = this.f.job_date.value; 
    let jd = '';
    if(job_date != undefined) {
      jd = job_date.year + "-" + job_date.month + "-" + job_date.day;
    }

    let invoice_date = this.f.invoice_date.value; 
    let invoiceDate = '';
    if(invoice_date != undefined) {
      invoiceDate = invoice_date.year + "-" + invoice_date.month + "-" + invoice_date.day;
    }

    let invoice_received_date = this.f.invoice_received_date.value; 
    let invoiceReceivedDate = '';
    if(invoice_received_date != undefined) {
      invoiceReceivedDate = invoice_received_date.year + "-" + invoice_received_date.month + "-" + invoice_received_date.day;
    }


    let params = {
      'docket': this.f.docket.value,
      'customer_id': this.f.customer_id.value,
      'job_date': jd,
      'vehicle_type': this.f.vehicle_type.value,

      'c_price': this.f.c_price.value,
      'c_vat': this.f.c_vat.value,
      'c_price_total': this.f.c_price_total.value,
      'c_extra': this.f.c_extra.value,
      'c_extra_vat': this.f.c_extra_vat.value,
      'c_extra_total': this.f.c_extra_total.value,
      'c_net': this.f.c_net.value,
      'c_vat_total': this.f.c_vat_total.value,
      'c_tprice': this.f.c_tprice.value,

      'driver_id': this.f.driver_id.value,
      'job_ref': this.f.job_ref.value,
      'call_sign': this.f.call_sign.value,
      'driver_type': this.f.driver_type.value,
      'cx_number': this.f.cx_number.value,
      'driver_vehicle': this.f.driver_vehicle.value,

      'd_price': this.f.d_price.value,
      'd_vat': this.f.d_vat.value,
      'd_price_total': this.f.d_price_total.value,
      'd_extra': this.f.d_extra.value,
      'd_extra_vat': this.f.d_extra_vat.value,
      'd_extra_total': this.f.d_extra_total.value,
      'd_net': this.f.d_net.value,
      'd_vat_total': this.f.d_vat_total.value,
      'd_tprice': this.f.d_tprice.value,

      'invoice_date': invoiceDate,
      'invoice_received_date': invoiceReceivedDate,
      'payment_date': this.f.payment_date.value,
      'invoice_number': this.f.invoice_number.value,
      'pod_file': this.f.pod_file.value,
      'journey': this.journey
    }
    this.apiService.saveTask(params).then(res => {
      let code = res.code;
      if(code == 200 ) {
        this.showConfirmModal();
      }else{
        let msg = res.msg;
        this.toastrService.warning(msg, 'Warning', {
          timeOut: 2000,
        })
      }
    }).catch(err => {

    })
  }

  validateJourney() {
    if(this.journey.length == 0) {
      this.journeyError = true;
      return true;
    }

    for(let idx=0; idx < this.journey.length; idx++) {
      let item = this.journey[idx];
      if(item.src == '' || item.dst == '') {
        this.journeyError = true;
        return true;
      }
    }
    this.journeyError = false;
    return false;
  }

  showConfirmModal() {
    $('#confirmModal').modal('show');
  }

  onCreateNew() {
    let dz = this.directiveRef.dropzone();
    dz.removeAllFiles();
    this.submitted = false;
    this.journey = [];
    this.journeyError = false;
    this.dataForm = this.formBuilder.group({
      customer_id: [null, Validators.required],
      docket: ['', Validators.required],
      job_date: [this.model, Validators.required],
      vehicle_type: [null, Validators.required],
      c_price: [0, Validators.required],
      c_vat: [null, []],
      c_price_total: [0, []],
      c_extra: [0, []],
      c_extra_vat: [null, []],
      c_extra_total: [0, []],
      c_net: [0, []],
      c_vat_total: [0,[]],
      c_tprice: [0, Validators.required],

      driver_id: [null, Validators.required],
      job_ref: [null, Validators.required],
      call_sign: [null, Validators.required],
      driver_type: [null, Validators.required],
      cx_number: [null, []],
      driver_vehicle: [null, []],
      d_price: [0, Validators.required],
      d_vat: [null, []],
      d_price_total: [0, []],
      d_extra: [0, []],
      d_extra_vat: [null, []],
      d_extra_total: [0, []],
      d_net: [0, []],
      d_vat_total: [0,[]],
      d_tprice: [0, Validators.required],

      invoice_date: [null, []],
      invoice_received_date: [null, []],
      payment_date: [null, []],
      invoice_number: [null, []],
      pod_file: [null, []],
    });

    $('#confirmModal').modal('hide');
  }

  onGoJobList() {
    this.router.navigate(['admin/job/list']);
    $('#confirmModal').modal('hide');
  }

  onCheckChange(event) {
    let checked = event.target.checked;
    let id = event.target.id;
    this.data[id] = checked;
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

  // select customer
  changeCustomer(item) {
    if (item != undefined) {
      this.dataForm
    }
    console.log(item);
  }

  onScrollToEnd() {
    if(this.customerOptions.length < this.customerTotal) {
      this.customerPage++;
      this.loadCustomer();
    }
  }

  customerSearchFn(event) {
    let term = event.term;
    if(!this.customerLoading) {
      this.customerPage = 1;
      this.customerOptions = [];
      this.customerTotal = 0;
      this.loadCustomer(term);
    }
  }

  customerOpen(event) {
    let customer_id = this.f.customer_id.value;
    if(customer_id != undefined) {

    }else{
      this.customerPage = 1;
      this.customerTotal = 0;
      this.customerOptions = [];
      this.loadCustomer();
    }
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
        console.log(this.driverOptions);
        this.driverTotal = res.total;
      }
    }).catch(err => {
      this.driverLoading = false;
      console.log(err);
    })
  }

  // change driver
  changeDriver(item) {
    if (item != undefined) {
      this.f.call_sign.setValue(item.call_sign);
      this.f.driver_type.setValue(item.type);
      if (item.type == 1) {
        // cx driver
        this.f.cx_number.setValue(item.cx_number);
      }
    }
  }

  onScrollToEndDriver() {
    if(this.driverOptions.length < this.driverTotal) {
      this.driverPage++;
      this.loadDriver();
    }
  }

  driverSearchFn(event) {
    let term = event.term;
    if(!this.driverLoading) {
      this.driverPage = 1;
      this.driverOptions = [];
      this.driverTotal = 0;
      this.loadDriver(term);
    }
  }

  driverOpen(event) {
    let driver_id = this.f.driver_id.value;
    if(driver_id != undefined) {

    }else{
      this.driverPage = 1;
      this.driverTotal = 0;
      this.driverOptions = [];
      this.loadDriver();
    }
  }

  loadOptions() {
    this.vehicleLoading = true;
    this.apiService.getJobOptions(null).then(res => {
      this.vehicleOptions = res.vehicle_type;
      this.typeOptions = res.driver_type;
      this.vatOptions = res.vat_type;
      this.vehicleLoading = false;
    });
  }

  addJourney() {
    this.journey.push({'src': '', 'dst': ''});
    console.log(this.journey);
  }

  removeJourney() {
    console.log(this.journey.length);
    if(this.journey.length > 0){

      this.journey.splice(this.journey.length -1 , 1);
      console.log(this.journey);
    }
  }
  /**
   * change event in invoice date
   * @param event 
   */
  onDateChange(date: NgbDateStruct) {
    let invoice_date: NgbDate = new NgbDate(date.year, date.month, date.day);
    let payment_date = this.calendar.getNext(invoice_date, 'd', 30);
    console.log(payment_date);
    let pd = payment_date.year + "-" + payment_date.month + "-" + payment_date.day;
    let str = moment(pd).format('YYYY-MM-DD')
    this.dataForm.patchValue({ 'payment_date': str });
  }

  /**
   * function for pod file upload
   * @param event 
   */
  onFileSelect(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.dataForm.get('pod_file').setValue(file);
    }
  }

  /**
   * callback for dropzone pod file
   */
  resetThumbnail(): void {
    // this.dataForm.patchValue({ 'pod_file': '' });
  }

  onSuccessThumb(data): void {
    console.log(data);
    const ret = data[1];
    this.dataForm.patchValue({ 'pod_file': ret.filename });
  }

  onErrorThumb(err): void {
    console.log(err);
    const ret = err[1];
    console.log(err);
  }

  // 
  changePrice(e) {
    // customer price 
    let c_price = parseFloat(this.f.c_price.value);
    let c_vat = this.f.c_vat.value;
    let c_vat_percent = 0;
    if(c_vat == 2) {
      c_vat_percent = 0.2;
    }
    let c_vat_price = c_vat_percent * c_price;
    let c_price_total =  c_price + c_vat_price;
    this.f.c_price_total.setValue(c_price_total);

    let c_extra = parseFloat(this.f.c_extra.value);
    let c_extra_vat = this.f.c_extra_vat.value;
    let c_extra_vat_percent = 0;
    if(c_extra_vat == 2) {
      c_extra_vat_percent = 0.2;
    }
    let c_extra_vat_price = c_extra_vat_percent * c_extra;
    let c_extra_total = c_extra + c_extra_vat_price;
    this.f.c_extra_total.setValue(c_extra_total);

    let c_net = c_price + c_extra;
    this.f.c_net.setValue(c_net);

    let c_vat_total = c_vat_price + c_extra_vat_price;
    this.f.c_vat_total.setValue(c_vat_total);

    let c_tprice = c_price_total + c_extra_total;
    this.f.c_tprice.setValue(c_tprice);

    // driver price 
    let d_price = parseFloat(this.f.d_price.value);
    let d_vat = this.f.d_vat.value;
    let d_vat_percent = 0;
    if(d_vat == 2) {
      d_vat_percent = 0.2;
    }
    let d_vat_price = d_vat_percent * d_price;
    let d_price_total =  d_price + d_vat_price;
    this.f.d_price_total.setValue(d_price_total);

    let d_extra = parseFloat(this.f.d_extra.value);
    let d_extra_vat = this.f.d_extra_vat.value;
    let d_extra_vat_percent = 0;
    if(d_extra_vat == 2) {
      d_extra_vat_percent = 0.2;
    }
    let d_extra_vat_price = d_extra_vat_percent * d_extra;
    let d_extra_total = d_extra + d_extra_vat_price;
    this.f.d_extra_total.setValue(d_extra_total);

    let d_net = d_price + d_extra;
    this.f.d_net.setValue(d_net);

    let d_vat_total = d_vat_price + d_extra_vat_price;
    this.f.d_vat_total.setValue(d_vat_total);

    let d_tprice = d_price_total + d_extra_total;
    this.f.d_tprice.setValue(d_tprice);

  }

  //
  changeVehicle() {
    let vehicleType = this.f.vehicle_type.value;
    this.f.driver_vehicle.setValue(vehicleType);
  }
}
