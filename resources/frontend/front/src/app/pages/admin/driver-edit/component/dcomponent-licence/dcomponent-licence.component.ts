import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from 'moment';
import { ApiService } from "../../../../../../app/shared/services/api.service";
declare var $: any;
import { environment } from "../../../../../../environments/environment";

@Component({
  selector: 'app-dcomponent-licence',
  templateUrl: './dcomponent-licence.component.html',
  styles: [
  ]
})
export class DcomponentLicenceComponent implements OnInit {
  downloadurl = `${environment.apiUrl}/admin/v1/driver/downloadpdf`;
  dataForm: FormGroup;
  submitted = false;
  disabled = false;
  driver_id= 0;
  hgv_licence_upload = null;

  @Input() vatOptions = [];
  @Input()
  set data(data) {
    this.driver_id = data.id;
    let licenceData = data.data;
    this.hgv_licence_upload = licenceData ? licenceData.hgv_licence_upload : null;
    this.dataForm = this.formBuilder.group({
      licence_number: [licenceData ? licenceData.licence_number : null, [Validators.required]],
      licence_expiry: [licenceData ? licenceData.vehicle_model : null, Validators.required],
      hgv_licence: [ licenceData ? licenceData.hgv_licence : false, [] ],
    });
  }

  @Output() valueChange = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {}
  get f(): any {
    return this.dataForm.controls;
  }
  uploadDocument(type_id) {
    $("#uploader").click();
  }
  uploadFile(event) {
    const file: File = event.target.files[0];
    console.log(file);
    if (file) {
      // this.fileName = file.name;
      const params = new FormData();
      params.append("file", file);
      params.append("driver_id", this.driver_id.toString());
      params.append("onlyfile", "yes");
      this.apiService
        .uploadDriverBusinessDocument(params)
        .then(res => {
          let code = res.code;
          if (code == 200) {
            $("#uploader").val("");
            this.hgv_licence_upload = res.filename;
          }
        })
        .catch(err => {
          let status = err.status;
        });
    }
  }
  deleteDocument() {
    let params = {
      driver_id: this.driver_id,
      filename: this.hgv_licence_upload,
      onlyfile: 'yes'
    };
    this.apiService
      .deleteDriverBusinessDocument(params)
      .then(res => {
        let code = res.code;
        if (code == 200) {
          $("#uploader").val("");
          this.hgv_licence_upload = null;
        }
      })
      .catch(err => {
        let status = err.status;
      });
  }
  onSubmit() {
    console.log("hre");
    this.submitted = true;

    // stop here if form is invalid
    if (this.dataForm.invalid) {
      return;
    }

    const params = this.dataForm.value;
    params.hgv_licence_upload = this.hgv_licence_upload;
    const data = {
      form: params
    };
    this.valueChange.emit(data);
  }
}
