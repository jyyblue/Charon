import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styles: [
  ],
  styleUrls: [
    '../../../../vendor/libs/ng-select/ng-select.scss',
  ]
})
export class CustomerEditComponent implements OnInit {

  private user_id = null;
  data = null;
  dataForm: FormGroup;
  loading = false;
  submitted = false;

  phoneMaskOptions = {
    mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  };
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastrService: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user_id = this.route.snapshot.params['id'];
    this.getData();
  }

  getData() {
    let params = {
      'userid': this.user_id,
    }
    this.apiService.getCustomerDetail(params).then(res => {
      let code = res.code;
      if(code == 200) {
        this.data = res.data;
        this.dataForm = this.formBuilder.group({
          company_name: [this.data.company_name, Validators.required],
          account_code: [this.data.account_code, Validators.required],
          company_email: [this.data.company_email, [Validators.required, Validators.email]],
          company_phone: [this.data.company_phone, Validators.required],
          company_address: [this.data.company_address, Validators.required],
          company_address2: [this.data.company_address2, []],
          company_city: [this.data.company_city, Validators.required],
          company_state: [this.data.company_state, Validators.required],
          company_postcode: [this.data.company_postcode, Validators.required],
    
          contact_email: [this.data.contact_email, [Validators.required, Validators.email]],
          contact_name: [this.data.contact_name, Validators.required],
          contact_phone: [this.data.contact_phone, Validators.required],
    
          pod_email: [this.data.pod_email, [Validators.required, Validators.email]],
          pod_name: [this.data.pod_name, Validators.required],
          pod_password: [this.data.pod_password, Validators.required],
        });
      }else{
        let message = res.message;
        this.toastrService.success(message, 'Info', {
          timeOut: 1500,
        });
        this.router.navigate(['admin/customer/list']);
      }
    }).catch(err => {

    })
  }

  get f(): any { return this.dataForm.controls; }

  onSubmit(): any {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dataForm.invalid) {
      return;
    }

    let params = {
      'id': this.user_id,
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
    this.apiService.updateCustomerAccount(params).then(res => {
      let code = res.code ;
      if(code == 200) {
        let message = res.message;
        this.toastrService.success(message);
      }else{
        let message = res.message;
        this.toastrService.error(message);
      }
    }).catch(err => {

    })
    return;
  }
}
