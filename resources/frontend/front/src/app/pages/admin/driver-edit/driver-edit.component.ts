import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/shared/services/api.service";

@Component({
  selector: "app-driver-edit",
  templateUrl: "./driver-edit.component.html",
  styles: [],
  styleUrls: ["../../../../vendor/libs/ng-select/ng-select.scss"]
})
export class DriverEditComponent implements OnInit {
  data = {
    'data': '',
    id: '',
    subcontractor: '',
    type: '',
    email: '',
  };
  dataForm: FormGroup;
  loading = false;
  submitted = false;

  phoneMaskOptions = {
    mask: [/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  };

  typeOptions = [];

  vatOptions = [];
  active = 1;
  userid;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.userid = this.route.snapshot.params["id"];
    this.getData();
  }

  ngOnInit(): void {}

  getData() {
    let params = {
      user_id: this.userid
    };
    this.apiService
      .getDriverDetail(params)
      .then(res => {
        let code = res.code;
        if (code == 200) {
          this.typeOptions = res.driver_type;
          this.vatOptions = res.vat_type;
          this.data = res.data;
          this.data.data = this.data.data ? JSON.parse(this.data.data): [];
        }
      })
      .catch(err => {
        let status = err.status;
      });
  }

  get f(): any {
    return this.dataForm.controls;
  }

  updateData(e) {
    console.log(e);
    const page = e.page;
    let fData = e.form;
    fData["email"] = fData["email"] ? fData["email"] : this.data.email;
    fData["user_id"] = this.data.id;
    fData["name"] = fData["subcontractor"]
      ? fData["subcontractor"]
      : this.data.subcontractor;
    let temp = this.data.data ? this.data.data : {};
    let oldData = {
      ...temp
    }
    let newData = e.form;
    let newKeys = Object.keys(newData);
    newKeys.forEach(key => {
      oldData[key] = newData[key];
    });
    let t = JSON.stringify(oldData);
    console.log(t);

    fData['data'] = JSON.stringify(oldData);
    console.log(fData);
    console.log(oldData);
    this.apiService
      .updateDriver(fData)
      .then(res => {
        let code = res.code;
        if (code == 200) {
          let message = res.message;
          this.toastrService.success(message);
          this.getData();
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
  }

  changeType(e) {
    let type = e.type;
    this.data.type = type;
  }
}
