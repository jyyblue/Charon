import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as textMaskAddons from 'text-mask-addons/dist/textMaskAddons';

@Component({
  selector: 'app-driver-add',
  templateUrl: './driver-add.component.html',
  styles: [
  ],
  styleUrls: ['../../../../vendor/libs/ng-select/ng-select.scss']
})

export class DriverAddComponent implements OnInit {
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
  ) { }

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      type: ['', Validators.required],
      cx_number: ['', []],
      call_sign: ['', Validators.required],
      address: ['', Validators.required],
      address2: ['', []],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postcode: ['', Validators.required],
      vat: ['', Validators.required],
      vat_number: ['', []],
      bank_name: ['', Validators.required],
      bank_code: ['', Validators.required],
      bank_account_number: ['', Validators.required],
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
