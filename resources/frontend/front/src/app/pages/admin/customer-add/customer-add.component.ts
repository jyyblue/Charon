import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styles: [
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
      pod_username: ['', Validators.required],
      pod_pwd: ['', Validators.required],
    });
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
