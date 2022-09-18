import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from 'moment';

@Component({
  selector: 'app-dc-detail-paye',
  templateUrl: './dc-detail-paye.component.html',
  styles: [
  ]
})
export class DcDetailPayeComponent implements OnInit {
  dataForm: FormGroup;
  submitted = false;
  type = 0;
  @Input()
  set data(data) {
    let driverData = data.data;
    let isCompany = driverData.isCompany ? driverData.isCompany : 'paye';
    let company_name = driverData.company_name ? driverData.company_name : '';
    let company_reg_no = driverData.company_reg_no ? driverData.company_reg_no : '';
    let email = driverData.email ? driverData.email : '';
    let phone_number = driverData.phone_number ? driverData.phone_number : '';
    let address = driverData.address ? driverData.address : '';
    let address2 = driverData.address2 ? driverData.address2 : '';
    let city = driverData.city ? driverData.city : '';
    let state = driverData.state ? driverData.state : '';
    let postcode = driverData.postcode ? driverData.postcode : '';
    let nationality = driverData.nationality ? driverData.nationality : '';
    let nationality_insurance_number = driverData.nationality_insurance_number ? driverData.nationality_insurance_number : '';
    let require_work_premit = driverData.require_work_premit ? driverData.require_work_premit : false;
    let work_premit_expire_date;
    if(driverData.birthday != undefined) {
      let jd = moment(driverData.work_premit_expire_date);
      work_premit_expire_date = {
        year: jd.year(),
        month: jd.month() + 1,
        day: jd.date()
      };
    }

    work_premit_expire_date = work_premit_expire_date ? work_premit_expire_date : null;
    
    let emergency_contact_name = driverData.emergency_contact_name ? driverData.emergency_contact_name : '';
    let emergency_contact_number = driverData.emergency_contact_number ? driverData.emergency_contact_number : '';
    let emergency_contact_realtion = driverData.emergency_contact_realtion ? driverData.emergency_contact_realtion : '';

    this.type = data.type;
    this.dataForm = this.formBuilder.group({
      isCompany: [isCompany, []],
      company_name: [company_name, [ ]],
      company_reg_no: [company_reg_no, [ ]],
      email: [
        email,
        [Validators.email,]
      ],
      phone_number: [phone_number, []],
      address: [address, []],
      address2: [address2, []],
      city: [city, []],
      state: [state, []],
      postcode: [postcode, []],

      nationality: [nationality, []],
      nationality_insurance_number: [nationality_insurance_number, [ ]],
      require_work_premit:  [require_work_premit, []],
      work_premit_expire_date:  [work_premit_expire_date, []],
      emergency_contact_name: [emergency_contact_name, Validators.required],
      emergency_contact_number: [emergency_contact_number, Validators.required],
      emergency_contact_realtion: [emergency_contact_realtion, Validators.required],
    });
  }

  @Output() valueChange = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.f.isCompany.valueChanges
    .subscribe(value => {
      this.validateForm();
    });
    this.validateForm();
  }

  validateForm() {
    let isCompany = this.f.isCompany.value;
    if(isCompany == 'losc') {
      this.f.company_name.setValidators([Validators.required]);
      this.f.company_reg_no.setValidators([Validators.required]);

      this.f.nationality.clearValidators();
      this.f.nationality_insurance_number.clearValidators();
    } else {
      this.f.company_name.clearValidators();
      this.f.company_reg_no.clearValidators();
    
      this.f.nationality.setValidators([Validators.required]);
      this.f.nationality_insurance_number.setValidators([Validators.required]);
    }
    this.f.email.setValidators([Validators.required, Validators.email]);
    this.f.phone_number.setValidators([Validators.required]);
    this.f.address.setValidators([Validators.required]);
    this.f.city.setValidators([Validators.required]);
    this.f.state.setValidators([Validators.required]);
    this.f.postcode.setValidators([Validators.required]);

    this.f.company_name.updateValueAndValidity();
    this.f.company_reg_no.updateValueAndValidity();
    this.f.email.updateValueAndValidity();
    this.f.phone_number.updateValueAndValidity();
    this.f.address.updateValueAndValidity();
    this.f.city.updateValueAndValidity();
    this.f.state.updateValueAndValidity();
    this.f.postcode.updateValueAndValidity();
    
    this.f.nationality.updateValueAndValidity();
    this.f.nationality_insurance_number.updateValueAndValidity();
  }

  get f(): any {
    return this.dataForm.controls;
  }
  
  onSubmit() {
    console.log("hre");
    this.submitted = true;

    // stop here if form is invalid
    if (this.dataForm.invalid) {
      return;
    }

    const params = this.dataForm.value;

    let work_premit_expire_date = this.f.work_premit_expire_date.value; 
    let jd = '';
    if(work_premit_expire_date != undefined) {
      jd = work_premit_expire_date.year + "-" + work_premit_expire_date.month + "-" + work_premit_expire_date.day;
    }
    params.work_premit_expire_date = jd;

    const data = {
      form: params
    };
    this.valueChange.emit(data);
  }
}
