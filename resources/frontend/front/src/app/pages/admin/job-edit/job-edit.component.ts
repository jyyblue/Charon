import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
const now = new Date();
declare var $: any;
import { environment } from 'src/environments/environment';
import { common as Const } from 'src/app/shared/const/common';
import { Task } from 'src/app/shared/models/task.model';
@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',

  styleUrls: [
    './job-edit.component.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss',
    '../../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss',
    '../../../../vendor/libs/ngx-dropzone-wrapper/ngx-dropzone-wrapper.scss'
  ]
})
export class JobEditComponent implements OnInit {
  resolveForm: FormGroup;
  submitted3 = false;

  disputeForm: FormGroup;
  submitted2 = false;


  @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  downloadurl = `${environment.apiUrl}/admin/v1/task/downloadpod`;
  disableDropZone = false;
  taskid: string;
  previoustPage: string;
  dataForm: FormGroup;
  data = new Task();

  customerOptions = [];
  customerLoading = false;
  customerPage = 1;
  customerTotal = 0;

  driverOptions = [];
  driverLoading = false;
  driverPage = 1;
  driverTotal = 0;
  driver: any = {}

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

  taskStatus = [];
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private calendar: NgbCalendar,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { 
    const token = this.authService.getToken();
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
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.taskid = this.route.snapshot.params['id'];
    this.previoustPage = this.route.snapshot.params['prePage'];
    this.getJob();
    this.loadOptions();
    this.loadStatus();

    this.dataForm = this.formBuilder.group({
      customer_id: [this.data.customer_id, Validators.required],
      docket: [ this.data.docket, Validators.required],
      job_date: [this.data.job_date, Validators.required],
      vehicle_type: [this.data.vehicle_type, Validators.required],
      c_price: [this.data.c_price.toFixed(2), Validators.required],
      c_vat: [this.data.c_vat, [Validators.required]],
      c_price_total: [ this.data.c_price_total.toFixed(2), []],
      c_extra: [ this.data.c_extra.toFixed(2), []],
      c_extra_vat: [ this.data.c_extra_vat, []],
      c_extra_total: [this.data.c_extra_total.toFixed(2), []],

      c_extra_0: [ this.data.c_extra_0.toFixed(2), []],
      c_extra_vat_0: [ this.data.c_extra_vat_0.toFixed(2), []],
      c_extra_total_0: [this.data.c_extra_total_0.toFixed(2), []],

      c_net: [ this.data.c_net.toFixed(2), []],
      c_vat_total: [ this.data.c_vat_total.toFixed(2),[]],
      c_tprice: [ this.data.c_tprice.toFixed(2), Validators.required],
      source: [this.data.source, []],
      has_pod: [this.data.has_pod, []],

      driver_id: [this.data.driver_id ? this.data.driver_id : 0, []],
      job_ref: [this.data.job_ref, []],
      call_sign: [ this.data.call_sign, []],
      driver_type: [ this.data.driver_type, []],
      cx_number: [ this.data.driver ?  this.data.driver.cx_number : '', []],
      driver_vehicle: [ this.data.driver_vehicle ? this.data.driver_vehicle : '', []],
      d_price: [ this.data.d_price ? this.data.d_price.toFixed(2): (0).toFixed(2), []],
      d_vat: [ this.data.d_vat, []],
      d_price_total: [ this.data.d_price_total ? this.data.d_price_total.toFixed(2) : (0).toFixed(2), []],
      d_extra: [ this.data.d_extra ? this.data.d_extra.toFixed(2) : (0).toFixed(2), []],
      d_extra_vat: [ this.data.d_extra_vat, []],
      d_extra_total: [ this.data.d_extra_total ? this.data.d_extra_total.toFixed(2) : (0).toFixed(2), []],
      d_extra_0: [ this.data.d_extra_0 ? this.data.d_extra_0.toFixed(2) : (0).toFixed(2), []],
      d_extra_vat_0: [ this.data.d_extra_vat_0, []],
      d_extra_total_0: [ this.data.d_extra_total_0 ? this.data.d_extra_total_0.toFixed(2) : (0).toFixed(2), []],
      d_net: [ this.data.d_net ? this.data.d_net.toFixed(2) : (0).toFixed(2), []],
      d_vat_total: [ this.data.d_vat_total ? this.data.d_vat_total.toFixed(2) : (0).toFixed(2),[]],
      d_tprice: [ this.data.d_tprice ? this.data.d_tprice.toFixed(2) : (0).toFixed(2), []],

      invoice_date: [this.data.invoice_date, []],
      invoice_received_date: [this.data.invoice_received_date, []],
      target_payment_date: [this.data.target_payment_date, []],
      invoice_number: [ this.data.invoice_number, []],
      pod_file: [this.data.pod_file, []],
      check_price: [this.data.check_price == 1 ? true: false, []],
      check_docket_off: [this.data.check_docket_off == 1 ? true : false, []],
      check_bank: [this.data.check_bank == 1 ? true : false, []],

      payment_date: [this.data.payment_date, []],
      payment_reference: [this.data.payment_reference, []],
      total_payment: [this.data.total_payment.toFixed(2), []],
      profit: [this.data.profit.toFixed(2), []],
      profitpercent: [this.data.profitpercent.toFixed(2), []]
    });

    this.disputeForm = this.formBuilder.group({
      description: [null, [Validators.required]],
    });

    this.resolveForm = this.formBuilder.group({
      description: [null, [Validators.required]],
    });
  }

  get f(): any { return this.dataForm.controls; }
  get df(): any { return this.disputeForm.controls; }
  get rf(): any { return this.resolveForm.controls; }

  getJob() {
    let params = {
      'taskid': this.taskid,
    }
    this.apiService.getTaskDetail(params).then(res => {
      let code = res.code;
      
      if(code == 200) {
        this.data = res.data;
        console.log(this.data);
        this.driver = this.data.driver;
        let job_date = null;
        if(this.data.job_date != undefined) {
          let jd = moment(this.data.job_date);
          job_date = {
            year: jd.year(),
            month: jd.month() + 1,
            day: jd.date()
          };
        }

        let invoice_date = null;
        if(this.data.invoice_date != undefined) {
          let iv = moment(this.data.invoice_date);
          invoice_date =  {
            year: iv.year(),
            month: iv.month() + 1,
            day: iv.date()
          }
        }

        let invoice_received_date = null;
        if(this.data.invoice_received_date != undefined) {
          let ird = moment(this.data.invoice_received_date);
          invoice_received_date = {
            year: ird.year(),
            month: ird.month() + 1,
            day: ird.date()
          }
        }

        let payment_date = null;
        if(this.data.payment_date != undefined) {
          let pd = moment(this.data.payment_date);
          payment_date = {
            year: pd.year(),
            month: pd.month() + 1,
            day: pd.date()
          }
        }
        let profit = ( this.data.profit/this.data.c_net) * 100;
        let profitpercent = profit.toFixed(2);

        this.dataForm = this.formBuilder.group({
          customer_id: [this.data.customer_id, Validators.required],
          docket: [ this.data.docket, Validators.required],
          job_date: [job_date, Validators.required],
          vehicle_type: [this.data.vehicle_type, Validators.required],
          c_price: [this.data.c_price.toFixed(2), Validators.required],
          c_vat: [this.data.c_vat, [Validators.required]],
          c_price_total: [ this.data.c_price_total.toFixed(2), []],
          c_extra: [ this.data.c_extra.toFixed(2), []],
          c_extra_vat: [ this.data.c_extra_vat, []],
          c_extra_total: [this.data.c_extra_total.toFixed(2), []],

          c_extra_0: [ this.data.c_extra_0.toFixed(2), []],
          c_extra_vat_0: [ this.data.c_extra_vat_0.toFixed(2), []],
          c_extra_total_0: [this.data.c_extra_total_0.toFixed(2), []],

          c_net: [ this.data.c_net.toFixed(2), []],
          c_vat_total: [ this.data.c_vat_total.toFixed(2),[]],
          c_tprice: [ this.data.c_tprice.toFixed(2), Validators.required],
          source: [this.data.source, []],
          has_pod: [this.data.has_pod, []],

          driver_id: [this.data.driver_id ? this.data.driver_id : 0, []],
          job_ref: [this.data.job_ref, []],
          call_sign: [ this.data.call_sign, []],
          driver_type: [ this.data.driver_type, []],
          cx_number: [ this.data.driver ?  this.data.driver.cx_number : '', []],
          driver_vehicle: [ this.data.driver_vehicle ? this.data.driver_vehicle : '', []],
          d_price: [ this.data.d_price ? this.data.d_price.toFixed(2): (0).toFixed(2), []],
          d_vat: [ this.data.d_vat, []],
          d_price_total: [ this.data.d_price_total ? this.data.d_price_total.toFixed(2) : (0).toFixed(2), []],
          d_extra: [ this.data.d_extra ? this.data.d_extra.toFixed(2) : (0).toFixed(2), []],
          d_extra_vat: [ this.data.d_extra_vat, []],
          d_extra_total: [ this.data.d_extra_total ? this.data.d_extra_total.toFixed(2) : (0).toFixed(2), []],
          d_extra_0: [ this.data.d_extra_0 ? this.data.d_extra_0.toFixed(2) : (0).toFixed(2), []],
          d_extra_vat_0: [ this.data.d_extra_vat_0, []],
          d_extra_total_0: [ this.data.d_extra_total_0 ? this.data.d_extra_total_0.toFixed(2) : (0).toFixed(2), []],
          d_net: [ this.data.d_net ? this.data.d_net.toFixed(2) : (0).toFixed(2), []],
          d_vat_total: [ this.data.d_vat_total ? this.data.d_vat_total.toFixed(2) : (0).toFixed(2),[]],
          d_tprice: [ this.data.d_tprice ? this.data.d_tprice.toFixed(2) : (0).toFixed(2), []],
          
          invoice_date: [invoice_date, []],
          invoice_received_date: [invoice_received_date, []],
          target_payment_date: [this.data.target_payment_date, []],
          invoice_number: [ this.data.invoice_number, []],
          pod_file: [this.data.pod_file, []],
          check_price: [this.data.check_price == 1 ? true: false, []],
          check_docket_off: [this.data.check_docket_off == 1 ? true : false, []],
          check_bank: [this.data.check_bank == 1 ? true : false, []],

          payment_date: [payment_date, []],
          payment_reference: [this.data.payment_reference, []],
          total_payment: [this.data.total_payment.toFixed(2), []],
          profit: [this.data.profit.toFixed(2), []],
          profitpercent: [profitpercent, []]
        });

        let customer = this.data.customer;
        let dispName = customer.account_code + '-' + customer.company_name;
        customer['dispName'] = dispName;
        this.customerOptions = [
          customer
        ];

        let driver = this.data.driver;
        if(driver) {
          let ddispName = driver.call_sign + '-' + driver.email;
          driver['dispName'] = ddispName;
          this.driverOptions = [
            driver
          ];
        }
        this.loadCustomer();
        this.loadDriver();

        // load journey
        let distances = this.data.distances;
        this.journey = [];
        if(distances.length > 0){
          distances.forEach(item => {
            let newItem = {
              'src': item.source,
              'dst': item.destination,
            }
            this.journey.push(newItem);
          });
        }
      }
    }).catch(err => {

    });
  }
  
  saveTask() {
    this.submitted = true;
    console.log(this.f.has_pod.value, '-pod value');
    // if(this.validateJourney()) {
    //   console.log('validate journey fail');
    //   return;
    // }
    if(this.dataForm.invalid){
      console.log('validate form fail');
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

    let payment_date = this.f.payment_date.value;
    let paymentDate = '';
    if(payment_date != undefined) {
      paymentDate = payment_date.year + "-" + payment_date.month + "-" + payment_date.day;
    }
    let params = {
      'id': this.taskid,
      'docket': this.f.docket.value,
      'customer_id': this.f.customer_id.value,
      'job_date': jd,
      'vehicle_type': this.f.vehicle_type.value,

      'c_price': this.f.c_price.value,
      'c_vat': this.f.c_vat.value,
      'c_price_total': this.f.c_price_total.value,
      'c_extra': this.f.c_extra.value,
      'c_extra_vat': 2,
      'c_extra_total': this.f.c_extra_total.value,
      'c_extra_0': this.f.c_extra_0.value,
      'c_extra_vat_0': 1,
      'c_extra_total_0': this.f.c_extra_total_0.value,

      'c_net': this.f.c_net.value,
      'c_vat_total': this.f.c_vat_total.value,
      'c_tprice': this.f.c_tprice.value,
      'source': this.f.source.value,
      'has_pod': this.f.has_pod.value,
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
      'd_extra_vat': 2,
      'd_extra_total': this.f.d_extra_total.value,
      'd_extra_0': this.f.d_extra_0.value,
      'd_extra_vat_0': 1,
      'd_extra_total_0': this.f.d_extra_total_0.value,

      'd_net': this.f.d_net.value,
      'd_vat_total': this.f.d_vat_total.value,
      'd_tprice': this.f.d_tprice.value,

      'invoice_date': invoiceDate,
      'invoice_received_date': invoiceReceivedDate,
      'target_payment_date': this.f.target_payment_date.value,
      'invoice_number': this.f.invoice_number.value,
      'pod_file': this.f.pod_file.value,
      'journey': this.journey,
      'status': 'completed',
      'check_price': this.f.check_price.value,
      'check_docket_off': this.f.check_docket_off.value,
      'check_bank': this.f.check_bank.value,

      'payment_date': paymentDate,
      'payment_reference': this.f.payment_reference.value,
      'total_payment': this.f.total_payment.value,
    }

    this.apiService.updateTaskAuto(params).then(res => {
      let code = res.code;
      if(code == 200) {
        this.toastrService.success('Job updated successfully!', 'Success', {
          timeOut: 1500,
        });
        // this.onGoJobList();
        this.getJob();
        this.showConfirmModal();
      }else{
        let message = res.msg;
        this.toastrService.error(message, 'Error', {
          timeOut: 1500,
        });
      }
    })
  }

  showConfirmModal() {
    $('#confirmModal').modal('show');
  }
  onGoJobList() {
    switch (this.previoustPage) {
      case Const.PREV_PAGE.ALL:
        this.router.navigate(['admin/job/list']);
        break;
      case Const.PREV_PAGE.PENDING:
        this.router.navigate(['admin/job/list-pending']);
        break;
      case Const.PREV_PAGE.PAYMENT_PENDING:
        this.router.navigate(['admin/job/list-pending-payment']);
        break;
      case Const.PREV_PAGE.COMPLRETED_PAYMENT_PENDING:
        this.router.navigate(['admin/job/list-cp-payment']);
        break;
      case Const.PREV_PAGE.COMPLETED:
        this.router.navigate(['admin/job/list-complete']);
        break;
      case Const.PREV_PAGE.QUERY:
        this.router.navigate(['admin/job/list-query']);
        break;
      default:
        this.router.navigate(['admin/job/list']);
        break;
    }
    $('#confirmModal').modal('hide');
  }
  stayHere() {
    $('#confirmModal').modal('hide');
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
        this.getJob();
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

  onCheckChange(event) {
    let checked = event.target.checked;
    let id = event.target.id;
    switch (id) {
      case 'has_pod':
        this.dataForm.patchValue({ 'has_pod': checked });
        break;
      case 'check_price':
        this.dataForm.patchValue({'check_price': checked});
        break;
      case 'check_docket_off':
        this.dataForm.patchValue({'check_docket_off': checked});
        break;
      case 'check_bank':
        this.dataForm.patchValue({'check_bank': checked});
        break;
      default:
        break;
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

  // select customer
  changeCustomer(item) {
    if (item != undefined) {
      this.dataForm
    }
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
      this.showBankDetail(item);
    }
  }

  showBankDetail(item) {
    this.driver = item;
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
  loadStatus() {
    let params = {};
    this.apiService.getTaskStatus(params).then(res => {
      this.taskStatus = res;
    })
  }
  addJourney() {
    this.journey.push({'src': '', 'dst': ''});
  }

  removeJourney() {
    if(this.journey.length > 0){
      this.journey.splice(this.journey.length -1 , 1);
    }
  }
  /**
   * change event in invoice date
   * @param event 
   */
  onDateChange(date: NgbDateStruct) {
    let invoice_date: NgbDate = new NgbDate(date.year, date.month, date.day);
    let target_payment_date = this.calendar.getNext(invoice_date, 'd', 30);
    let pd = target_payment_date.year + "-" + target_payment_date.month + "-" + target_payment_date.day;
    let str = moment(pd).format('YYYY-MM-DD')
    this.dataForm.patchValue({ 'target_payment_date': str });
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
    this.dataForm.patchValue({ 'pod_file': '' });
  }

  onCancel(e): void {
    
  }
  onSuccessThumb(data): void {
    const ret = data[1];
    this.dataForm.patchValue({ 'pod_file': ret.filename });
    this.disableDropZone = true;
  }

  onErrorThumb(err): void {
    const ret = err[1];
  }

  onReset(): void {
    this.directiveRef.reset();
    this.disableDropZone = false;
    this.dataForm.patchValue({ 'pod_file': '' });
  }
  // 
  changePrice() {
    // customer price 
    let c_price = parseFloat(this.f.c_price.value);
    this.f.c_price.setValue(c_price.toFixed(2));
    let c_vat = this.f.c_vat.value;
    let c_vat_percent = 0;
    if(c_vat == 2) {
      c_vat_percent = 0.2;
    }
    let c_vat_price = c_vat_percent * c_price;
    let c_price_total =  c_price + c_vat_price;
    this.f.c_price_total.setValue(c_price_total.toFixed(2));

    let c_extra = parseFloat(this.f.c_extra.value);
    this.f.c_extra.setValue(c_extra.toFixed(2));
    let c_extra_vat_percent = 0.2;
    let c_extra_vat_price = c_extra_vat_percent * c_extra;
    let c_extra_total = c_extra + c_extra_vat_price;
    this.f.c_extra_total.setValue(c_extra_total.toFixed(2));

    let c_extra_0 = parseFloat(this.f.c_extra_0.value);
    this.f.c_extra_0.setValue(c_extra_0.toFixed(2));
    let c_extra_vat_percent_0 = 0;
    let c_extra_vat_price_0 = c_extra_vat_percent_0 * c_extra_0;
    let c_extra_total_0 = c_extra_0 + c_extra_vat_price_0;
    this.f.c_extra_total_0.setValue(c_extra_total_0.toFixed(2));

    let c_net = c_price + c_extra + c_extra_0;
    this.f.c_net.setValue(c_net.toFixed(2));

    let c_vat_total = c_vat_price + c_extra_vat_price + c_extra_vat_price_0;
    this.f.c_vat_total.setValue(c_vat_total.toFixed(2));

    let c_tprice = c_price_total + c_extra_total + c_extra_total_0;
    this.f.c_tprice.setValue(c_tprice.toFixed(2));

    // driver price 
    let d_price = parseFloat(this.f.d_price.value);
    this.f.d_price.setValue(d_price.toFixed(2));
    let d_vat = this.f.d_vat.value;
    let d_vat_percent = 0;
    if(d_vat == 2) {
      d_vat_percent = 0.2;
    }
    let d_vat_price = d_vat_percent * d_price;
    let d_price_total =  d_price + d_vat_price;
    this.f.d_price_total.setValue(d_price_total.toFixed(2));

    let d_extra = parseFloat(this.f.d_extra.value);
    this.f.d_extra.setValue(d_extra.toFixed(2));
    let d_extra_vat_percent = 0.2;
    let d_extra_vat_price = d_extra_vat_percent * d_extra;
    let d_extra_total = d_extra + d_extra_vat_price;
    this.f.d_extra_total.setValue(d_extra_total.toFixed(2));

    let d_extra_0 = parseFloat(this.f.d_extra_0.value);
    this.f.d_extra_0.setValue(d_extra_0.toFixed(2));
    let d_extra_vat_percent_0 = 0;
    let d_extra_vat_price_0 = d_extra_vat_percent_0 * d_extra_0;
    let d_extra_total_0 = d_extra_0 + d_extra_vat_price_0;
    this.f.d_extra_total_0.setValue(d_extra_total_0.toFixed(2));


    let d_net = d_price + d_extra + d_extra_0;
    this.f.d_net.setValue(d_net.toFixed(2));

    let d_vat_total = d_vat_price + d_extra_vat_price + d_extra_vat_price_0;
    this.f.d_vat_total.setValue(d_vat_total.toFixed(2));

    let d_tprice = d_price_total + d_extra_total + d_extra_total_0;
    this.f.d_tprice.setValue(d_tprice.toFixed(2));

    let profit = c_net - d_net;
    this.f.profit.setValue(profit.toFixed(2));

    let profitpercent = (profit / c_net) * 100;
    this.f.profitpercent.setValue(profitpercent.toFixed(2));
  }

  //
  changeVehicle() {
    let vehicleType = this.f.vehicle_type.value;
    this.f.driver_vehicle.setValue(vehicleType);
  }

  // resolve query 
  resolveTask() {
    this.submitted3 = true;
    // stop here if form is invalid
    if (this.resolveForm.invalid) {
      return;
    }
    
    let params = {
      'taskid': this.taskid,
      'description': this.rf.description.value
    };
    this.apiService.resolveDisputeTask(params).then(res => {
      let code = res.code;
      if(code == 200) {
        this.toastrService.success('Resolve dispute successfully!', 'Success', {
          timeOut: 1500,
        });
        $('#resolveModal').modal('hide');
        this.getJob();
      }else{
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
}
