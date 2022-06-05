import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-dcomponent-financial-detail",
  templateUrl: "./dcomponent-financial-detail.component.html",
  styles: []
})
export class DcomponentFinancialDetailComponent implements OnInit {
  dataForm: FormGroup;
  submitted = false;
  @Input() vatOptions = [];
  @Input()
  set data(data) {
    console.log(data);
    this.dataForm = this.formBuilder.group({
      bank_name: [data ? data.bank_name : null, [Validators.required]],
      bank_sort_code: [data ? data.bank_sort_code : null, Validators.required],
      bank_account_number: [
        data ? data.bank_account_number : null,
        Validators.required
      ],
      payee_name: [data ? data.payee_name : null, [Validators.required]],
      vat: [data ? data.vat : null, Validators.required],
      vat_number: [data ? data.vat_number : null, []]
    });
  }

  @Output() valueChange = new EventEmitter<any>();
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

    const params = this.dataForm.value;

    const data = {
      form: params
    };
    this.valueChange.emit(data);
  }
}
