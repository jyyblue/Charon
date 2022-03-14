import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styles: [
  ],
  styleUrls: [
    '../../../../vendor/libs/ng-select/ng-select.scss',
  ]
})
export class DriverEditComponent implements OnInit {
  data = null;
  dataForm: FormGroup;
  loading = false;
  submitted = false;

  phoneMaskOptions = {
    mask: [/[1-9]/, /\d/, /\d/,  /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  };
  disabled = false;

  typeOptions = [];

  vatOptions = [];

  userid;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastrService: ToastrService,
    private router: Router,
  ) { 
    this.userid = this.route.snapshot.params['id'];
    this.getData();
  }

  ngOnInit(): void {
  }

  getData() {
    let params = {
      'user_id': this.userid,
    }
    this.apiService.getDriverDetail(params).then(res => {
      let code = res.code;
      if(code == 200) {
        this.typeOptions = res.driver_type;
        this.vatOptions = res.vat_type;
        this.data = res.data;
        this.dataForm = this.formBuilder.group({
          subcontractor: [this.data.subcontractor, Validators.required],
          // name: [this.data.name, Validators.required],
          first_name: [this.data.first_name, Validators.required],
          last_name: [this.data.last_name, Validators.required],
          email: [this.data.email, [Validators.required, Validators.email]],
          phone_number: [this.data.phone_number, Validators.required],
          call_sign: [this.data.call_sign, Validators.required],
          type: [this.data.type, Validators.required],
          cx_number: [this.data.cx_number, []],
          address: [this.data.address, Validators.required],
          address2: [this.data.address2, []],
          city: [this.data.city, Validators.required],
          state: [this.data.state, Validators.required],
          postcode: [this.data.postcode, Validators.required],
          vat: [this.data.vat, Validators.required],
          vat_number: [this.data.vat_number, []],
          bank_name: [this.data.bank_name, Validators.required],
          bank_sort_code: [this.data.bank_sort_code, Validators.required],
          bank_account_number: [this.data.bank_account_number, Validators.required],
          payee_name: [this.data.payee_name, Validators.required],
        });
      }
    }).catch(err => {
      let status = err.status;
    });
  }

  get f(): any { return this.dataForm.controls; }

  onSubmit(): any {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dataForm.invalid) {
      console.log('form invalid');
      return;
    }

    let params = {
      'user_id': this.userid,
      'subcontractor':this.f.subcontractor.value,
      // 'name': this.f.name.value,
      'first_name':this.f.first_name.value,
      'last_name': this.f.last_name.value,
      'email': this.f.email.value,
      'phone_number': this.f.phone_number.value,
      'call_sign': this.f.call_sign.value,
      'type': this.f.type.value,
      'cx_number': this.f.cx_number.value,
      'address': this.f.address.value,
      'address2': this.f.address2.value,
      'city': this.f.city.value,
      'state': this.f.state.value,
      'postcode': this.f.postcode.value,
      'vat': this.f.vat.value,
      'vat_number': this.f.vat_number.value,
      'bank_name': this.f.bank_name.value,
      'bank_sort_code':this.f.bank_sort_code.value,
      'bank_account_number': this.f.bank_account_number.value,
      'payee_name': this.f.payee_name.value,
    };

    this.apiService.updateDriver(params).then(res => {
      let code = res.code;
      if(code == 200) {
        let message = res.message;
        this.toastrService.success(message);
        this.router.navigate(['admin/driver/list']);
      }else{
        let message = res.message;
        this.toastrService.error(message);
      }
    }).catch(err => {
      console.log(err);
      let status = err.status;
      if(status == 422) {
        // upprocessable error validation error in server side
        let error = err.error;
        let message = error.message;
        let errors = error.errors;
        this.toastrService.error(message);
      }else{
        this.toastrService.error('Something wrong');
      }
    })
    return;
  }
}
