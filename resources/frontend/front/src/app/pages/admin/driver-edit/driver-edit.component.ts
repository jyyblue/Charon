import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styles: [
  ]
})
export class DriverEditComponent implements OnInit {
  data = null;
  dataForm: FormGroup;
  loading = false;
  submitted = false;

  phoneMaskOptions = {
    mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
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
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    let userid = this.route.snapshot.params['id'];
    this.getData();
  }

  getData() {
    setTimeout(() => {
      this.data = {
        id: 1,
        first_name: 'First Name',
        last_name: 'First Name',
        email: 'First Name',
        phone: 'First Name',
        type: 1,
        cx_number: 'First Name',
        call_sign: 'First Name',
        address: 'First Name',
        address2: 'First Name',
        city: 'First Name',
        state: 'First Name',
        postcode: 'First Name',
        vat: 2,
        vat_number: 'First Name',
        bank_name: 'First Name',
        bank_code: 'First Name',
        bank_account_number: 'First Name',
      };

      this.dataForm = this.formBuilder.group({
        first_name: [this.data.first_name, Validators.required],
        last_name: [this.data.last_name, Validators.required],
        email: [this.data.email, [Validators.required, Validators.email]],
        phone: [this.data.phone, Validators.required],
        type: [this.data.type, Validators.required],
        cx_number: [this.data.cx_number, []],
        call_sign: [this.data.call_sign, Validators.required],
        address: [this.data.address, Validators.required],
        address2: [this.data.address2, []],
        city: [this.data.city, Validators.required],
        state: [this.data.state, Validators.required],
        postcode: [this.data.postcode, Validators.required],
        vat: [this.data.vat, Validators.required],
        vat_number: [this.data.vat_number, []],
        bank_name: [this.data.bank_name, Validators.required],
        bank_code: [this.data.bank_code, Validators.required],
        bank_account_number: [this.data.bank_account_number, Validators.required],
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
