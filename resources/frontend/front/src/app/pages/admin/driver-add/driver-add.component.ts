import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as textMaskAddons from "text-mask-addons/dist/textMaskAddons";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/api.service";

@Component({
  selector: "app-driver-add",
  templateUrl: "./driver-add.component.html",
  styles: [],
  styleUrls: ["../../../../vendor/libs/ng-select/ng-select.scss"]
})
export class DriverAddComponent implements OnInit {
  dataForm: FormGroup;
  loading = false;
  submitted = false;

  phoneMaskOptions = {
    mask: [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  };
  disabled = true;
  active = 1;
  typeOptions = [
    { value: 1, label: "CX" },
    { value: 2, label: "PAYE" },
    { value: 3, label: "SE" },
    { value: 4, label: "Company" }
  ];

  vatOptions = [
    { value: 1, label: "0%" },
    { value: 2, label: "20%" }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.getData();
  }

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      subcontractor: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      call_sign: [null, Validators.required],
      type: [null, Validators.required],
      cx_number: [null, []]
    });
  }
  getData() {
    let params = {};
    this.apiService
      .getDriverOptions(params)
      .then(res => {
        let code = res.code;
        if (code == 200) {
          this.typeOptions = res.driver_type;
          this.vatOptions = res.vat_type;
        }
      })
      .catch(err => {
        let status = err.status;
      });
  }
  get f(): any {
    return this.dataForm.controls;
  }

  onSubmit(): any {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dataForm.invalid) {
      console.log(this.dataForm);
      this.toastrService.error("Enter valid values");
      return;
    }

    let params = this.dataForm.value;

    this.apiService
      .storeDriver(params)
      .then(res => {
        let code = res.code;
        if (code == 200) {
          let message = res.message;
          this.toastrService.success(message);
          this.router.navigate(["admin/driver/edit", res.driver_id]);
        } else {
          let message = res.message;
          this.toastrService.error(message);
        }
      })
      .catch(err => {
        console.log(err);
        let status = err.status;
        if (status == 422) {
          // upprocessable error validation error in server side
          let error = err.error;
          let message = error.message;
          let errors = error.errors;
          this.toastrService.error(message);
        } else {
          this.toastrService.error("Something wrong");
        }
      });
    return;
  }
}
