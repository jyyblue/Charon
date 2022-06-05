import { Component, Input, OnInit } from "@angular/core";
import { ApiService } from "src/app/shared/services/api.service";
import * as numeral from "numeral";

@Component({
  selector: "app-driver-detail-tab",
  templateUrl: "./driver-detail-tab.component.html",
  styles: []
})
export class DriverDetailTabComponent implements OnInit {
  @Input() driverId = 0;
  constructor(private apiService: ApiService) {}
  userData = {
    id: null,
    subcontractor: null,
    first_name: null,
    last_name: null,
    email: null,
    phone_number: null,
    call_sign: null,
    type: null,
    cx_number: null,
    address: null,
    address2: null,
    city: null,
    state: null,
    postcode: null,
    vat: null,
    vat_number: null,
    bank_name: null,
    bank_sort_code: null,
    bank_account_number: null,
    payee_name: null,
    driver_type: null,
    vat_item: null,
    posts: null,
    followers: null,
    following: null
  };
  getData() {
    let params = {
      user_id: this.driverId
    };
    this.apiService
      .getDriverDetail(params)
      .then(res => {
        let code = res.code;
        if (code == 200) {
          // this.typeOptions = res.driver_type;
          // this.vatOptions = res.vat_type;
          this.userData = res.data;
        }
      })
      .catch(err => {
        let status = err.status;
      });
  }
  ngOnInit(): void {
    this.getData();
  }
  formatInt(v) {
    return numeral(v).format("0,0");
  }
}
