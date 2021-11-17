import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styles: [
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
  ) { }

  ngOnInit(): void {
    this.user_id = this.route.snapshot.params['id'];
    this.getData();
  }

  getData() {
    setTimeout(() => {
      this.data = {
        company_name: 'dd',
        company_code: 'dd',
        company_email: 'dd',
        company_phone: '1234567890',
        company_address: 'dd',
        company_address2: 'fff',
        company_city: 'qqq',
        company_state: 'ttt',
        company_postcode: 'co123',
        contact_email: 'con@gmail.com',
        contact_name: 'cname',
        contact_phone: '3216540978',
        pod_email: 'p@gmail.com',
        pod_name: 'pname',
        pod_pwd: 'ddr'
      };
      this.dataForm = this.formBuilder.group({
        company_name: [this.data.company_name, Validators.required],
        company_code: [this.data.company_code, Validators.required],
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
        pod_pwd: [this.data.pod_pwd, Validators.required],
      });
    }, 2000);
  }

  get f(): any { return this.dataForm.controls; }

  onSubmit(): any {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dataForm.invalid) {
      return;
    }

    return;
  }
}
