import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-dcomponent-basic",
  templateUrl: "./dcomponent-basic.component.html",
  styles: []
})
export class DcomponentBasicComponent implements OnInit {
  dataForm: FormGroup;
  submitted = false;
  @Input() typeOptions = [];
  @Input()
  set data(data) {
    console.log(data);
    this.dataForm = this.formBuilder.group({
      subcontractor: [data ? data.subcontractor : null, [Validators.required]],
      type: [data ? data.type : null, Validators.required],
      call_sign: [data ? data.call_sign : null, Validators.required],
      cx_number: [data ? data.cx_number : null, []]
    });
  }

  @Output() valueChange = new EventEmitter<any>();
  @Output() typeChange = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}
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

    const params = {
      subcontractor: this.f.subcontractor.value,
      type: this.f.type.value,
      call_sign: this.f.call_sign.value,
      cx_number: this.f.cx_number.value
    };

    const data = {
      page: "basic",
      form: params
    };
    this.valueChange.emit(data);
  }

  onChangeType(e) {
    console.log(this.f.type.value);
    const data = {
      type: this.f.type.value
    };
    this.typeChange.emit(data);
  }
}
