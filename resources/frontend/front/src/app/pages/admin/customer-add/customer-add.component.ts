import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styles: [
  ],
  styleUrls: [
    '../../../../vendor/libs/ng-select/ng-select.scss',
  ]
})
export class CustomerAddComponent implements OnInit {
  dataForm: FormGroup;
  loading = false;
  submitted = false;

  phoneMaskOptions = {
    mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  };
  disabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastrService: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      company_name: ['', Validators.required],
      account_code: ['', Validators.required],
      company_email: ['', [Validators.required, Validators.email]],
      company_phone: ['', Validators.required],
      company_address: ['', Validators.required],
      company_address2: ['', []],
      company_city: ['', Validators.required],
      company_state: ['', Validators.required],
      company_postcode: ['', Validators.required],

      contact_email: ['', [Validators.required, Validators.email]],
      contact_name: ['', Validators.required],
      contact_phone: ['', Validators.required],

      pod_email: ['', [Validators.required, Validators.email]],
      pod_name: ['', Validators.required],
      pod_password: ['', Validators.required],
    });
  }
  get f(): any { return this.dataForm.controls; }

  onSubmit(): any {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dataForm.invalid) {
      return;
    }

    let params = {
      'company_name': this.f.company_name.value,
      'account_code': this.f.account_code.value,
      'company_email': this.f.company_email.value,
      'company_phone': this.f.company_phone.value,
      'company_address': this.f.company_address.value,
      'company_address2': this.f.company_address2.value,
      'company_city': this.f.company_city.value,
      'company_state': this.f.company_state.value,
      'company_postcode': this.f.company_postcode.value,
      'contact_email': this.f.contact_email.value,
      'contact_name': this.f.contact_name.value,
      'contact_phone': this.f.contact_phone.value,
      'pod_email': this.f.pod_email.value,
      'pod_name': this.f.pod_name.value,
      'pod_password': this.f.pod_password.value,
    };
    this.apiService.storeCustomerAccount(params).then(res => {
      let code = res.code ;
      if(code == 200) {
        let message = res.message;
        this.toastrService.success(message);
      }else{
        let message = res.message;
        this.toastrService.error(message);
      }
    }).catch(err => {
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
    return;
  }
}
