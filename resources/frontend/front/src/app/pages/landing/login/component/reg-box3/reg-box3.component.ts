import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countries } from 'src/app/shared/const/country-data-store';

@Component({
  selector: 'app-reg-box3',
  templateUrl: './reg-box3.component.html',
  styleUrls: ['./reg-box3.component.scss']
})
export class RegBox3Component implements OnInit {
  public countries:any = countries

  dataForm: FormGroup;
  submitted = false;
  fShowAddress = false;
  @Input() 
  set data(data){
    console.log(data);
    this.dataForm = this.formBuilder.group({
      company_name: [data.company_name, Validators.required],
      company_reg_number: [data.company_reg_number],
      postcode: [data.postcode, Validators.required],
      country: [data.country, Validators.required],
      address1: [data.address1, Validators.required],
      address2: [data.address2],
      city: [data.city, Validators.required],
      vat: [data.vat, Validators.required],
      head_phone_number: [data.head_phone_number, Validators.required],
      web_url: [data.web_url],
    });
  };

  @Output() valueChange = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit(): void {
  }
  get f(): any { return this.dataForm.controls; }

  showAddressDetail() {
    console.log('ehehello');
    const c_name = this.f.company_name.value;
    const c_reg_number = this.f.company_reg_number.value;
    const postcode = this.f.postcode.value;
    if(c_name && postcode) {
      this.fShowAddress = true;
      return;
    }
    if(c_reg_number) {
      this.fShowAddress = true;
      return;
    }
    this.fShowAddress = false;
  }
  onSubmit() {
    console.log('hre');
    this.submitted = true;

    // stop here if form is invalid
    if (this.dataForm.invalid) {
      return;
    }

    const params = {
      company_name: this.f.company_name.value,
      company_reg_number: this.f.company_reg_number.value,
      postcode: this.f.postcode.value,
      country: this.f.country.value,
      address1: this.f.address1.value,
      address2: this.f.address2.value,
      city: this.f.city.value,
      vat: this.f.vat.value,
      head_phone_number: this.f.head_phone_number.value,
      web_url: this.f.web_url.value,
    };

    const data = {
      page: '4',
      direction: 'forward',
      form: params,
    }
    this.valueChange.emit(data);
  }

  onBack() {
    const data = {
      page: '2',
      direction: 'back'
    }
    this.valueChange.emit(data);
  }
}
