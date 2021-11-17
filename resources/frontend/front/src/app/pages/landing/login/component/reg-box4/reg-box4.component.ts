import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countries } from 'src/app/shared/const/country-data-store';

@Component({
  selector: 'app-reg-box4',
  templateUrl: './reg-box4.component.html',
  styleUrls: ['./reg-box4.component.scss']
})
export class RegBox4Component implements OnInit {
  public countries:any = countries;
  dataForm: FormGroup;
  submitted = false;
  allData: any;
  @Input() 
  set data(data){
    this.allData = data;
    this.dataForm = this.formBuilder.group({
      is_invoice_contact: [data.is_invoice_contact, Validators.required],
      in_first_name: [data.in_first_name, Validators.required],
      in_last_name: [data.in_last_name, Validators.required],
      in_email: [data.in_email, [Validators.required, Validators.email]],
      in_home_phone: [data.in_home_phone, Validators.required],
      is_invoice_address: [data.is_invoice_address, Validators.required],
      in_postcode: [data.in_postcode, Validators.required],
      in_country: [data.in_country, Validators.required],
      in_address1: [data.in_address1, Validators.required],
      in_address2: [data.in_address2],
      in_city: [data.in_city, Validators.required],
    });
  };

  @Output() valueChange = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  get f(): any { return this.dataForm.controls; }
  onSubmit() {
    console.log('hre');
    this.submitted = true;

    if(this.f.is_invoice_contact.value === 'yes') {
      this.f.in_first_name.setValue(this.allData.first_name);
      this.f.in_last_name.setValue(this.allData.last_name);
      this.f.in_email.setValue(this.allData.email);
      this.f.in_home_phone.setValue(this.allData.home_phone);
    }

    if(this.f.is_invoice_address.value === 'yes') {
      this.f.in_postcode.setValue(this.allData.postcode);
      this.f.in_country.setValue(this.allData.country);
      this.f.in_address1.setValue(this.allData.address1);
      this.f.in_address2.setValue(this.allData.address2);
      this.f.in_city.setValue(this.allData.city);
    }
    // stop here if form is invalid
    if (this.dataForm.invalid) {
      return;
    }

    const params = {
      is_invoice_contact: this.f.is_invoice_contact.value,
      in_first_name: this.f.in_first_name.value,
      in_last_name: this.f.in_last_name.value,
      in_email: this.f.in_email.value,
      in_home_phone: this.f.in_home_phone.value,
      is_invoice_address: this.f.is_invoice_address.value,
      in_country: this.f.in_country.value,
      in_postcode: this.f.in_postcode.value,
      in_city: this.f.in_city.value,
      in_address1: this.f.in_address1.value,
      in_address2: this.f.in_address2.value
    };

    const data = {
      page: '5',
      direction: 'forward',
      form: params,
    }
    this.valueChange.emit(data);
  }

  onBack() {
    const data = {
      page: '3',
      direction: 'back'
    }
    this.valueChange.emit(data);
  }
}
