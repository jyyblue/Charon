import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as textMaskAddons from 'text-mask-addons/dist/textMaskAddons';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-driver-add',
  templateUrl: './driver-add.component.html',
  styles: [
  ],
  styleUrls: [
    '../../../../vendor/libs/ng-select/ng-select.scss',
  ]
})

export class DriverAddComponent implements OnInit {
  dataForm: FormGroup;
  loading = false;
  submitted = false;

  phoneMaskOptions = {
    mask: [/[1-9]/, /\d/, /\d/,  /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  };
  disabled = false;

  typeOptions = [
    { value: 1, label: 'CX' },
    { value: 2, label: 'PAYE' },
    { value: 3, label: 'SE' },
    { value: 4, label: 'Company' },
  ];

  vatOptions = [
    { value: 1, label: '0%' },
    { value: 2, label: '20%' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastrService: ToastrService,
    private router: Router,
  ) { 
        this.getData();
  }

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      subcontractor: [null, Validators.required],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone_number: [null, Validators.required],
      call_sign: [null, Validators.required],
      type: [null, Validators.required],
      cx_number: [null, []],
      address: [null, Validators.required],
      address2: [null, []],
      city: [null, Validators.required],
      state: [null, Validators.required],
      postcode: [null, Validators.required],
      vat: [null, Validators.required],
      vat_number: [null, []],
      bank_name: [null, Validators.required],
      bank_sort_code: [null, Validators.required],
      bank_account_number: [null, Validators.required],
      payee_name: [null, Validators.required],
    });
  }
  getData() {
    let params = {
      
    }
    this.apiService.getDriverOptions(params).then(res => {
      let code = res.code;
      if(code == 200) {
        this.typeOptions = res.driver_type;
        this.vatOptions = res.vat_type;
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
      console.log(this.dataForm);
      this.toastrService.error('Enter valid values');
      return;
    }

    let params = {
      'subcontractor':this.f.subcontractor.value,
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

    this.apiService.storeDriver(params).then(res => {
      let code = res.code;
      if(code == 200) {
        let message = res.message;
        this.toastrService.success(message);
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
