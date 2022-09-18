import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from 'moment';
@Component({
  selector: 'app-dcomponent-vehicle',
  templateUrl: './dcomponent-vehicle.component.html',
  styles: [
  ]
})
export class DcomponentVehicleComponent implements OnInit {

  dataForm: FormGroup;
  submitted = false;
  disabled = false;

  @Input() vatOptions = [];
  @Input()
  set data(data) {
    let vehicleData = data.data;
    this.dataForm = this.formBuilder.group({
      vehicle_make: [vehicleData ? vehicleData.vehicle_make : null, [Validators.required]],
      vehicle_model: [vehicleData ? vehicleData.vehicle_model : null, Validators.required],
      vehicle_registration: [
        vehicleData ? vehicleData.vehicle_registration : null,
        [Validators.required]
      ],
      vehicle_type: [vehicleData ? vehicleData.vehicle_type : null, [Validators.required]],
      tax_expiry: [vehicleData ? vehicleData.tax_expiry : null, Validators.required],
      mot_expiry: [vehicleData ? vehicleData.mot_expiry : null, [Validators.required]],
      vehicle_insurance: [vehicleData ? vehicleData.vehicle_insurance : null, [Validators.required]],
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
