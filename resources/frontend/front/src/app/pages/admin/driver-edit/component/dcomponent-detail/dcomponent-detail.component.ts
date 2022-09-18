import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-dcomponent-detail",
  templateUrl: "./dcomponent-detail.component.html",
  styles: []
})
export class DcomponentDetailComponent implements OnInit {
  dataForm: FormGroup;
  submitted = false;
  type = 0;
  _data = null;
  
  @Input() typeOptions = [];
  @Input()
  set data(data) {
    this._data = data;
    this.type = data.type;
    this.dataForm = this.formBuilder.group({
      company_name: [data ? data.company_name : null, []],
      name: [data ? data.name : null, []],
      company_reg_no: [data ? data.company_reg_no : null, []],
      email: [
        data ? data.email : null,
        [Validators.required, Validators.email]
      ],
      phone_number: [data ? data.phone_number : null, Validators.required],
      address: [data ? data.address : null, Validators.required],
      address2: [data ? data.address2 : null, []],
      city: [data ? data.city : null, Validators.required],
      state: [data ? data.state : null, Validators.required],
      postcode: [data ? data.postcode : null, Validators.required],
    });
  }

  @Output() valueChange = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}
  get f(): any {
    return this.dataForm.controls;
  }

  updateData(e) {
    let fData = e.form;
    const data = {
      form: fData
    };
    this.valueChange.emit(data);
  }

  onSubmit() {
    console.log("hre");
    this.submitted = true;

    // stop here if form is invalid
    if (this.dataForm.invalid) {
      return;
    }

    const params = this.dataForm.value;

    const data = {
      form: params
    };
    this.valueChange.emit(data);
  }
}
