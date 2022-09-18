import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from 'moment';
import { ApiService } from "../../../../../../app/shared/services/api.service";
declare var $: any;
import { environment } from "../../../../../../environments/environment";

@Component({
  selector: 'app-dcomponent-health',
  templateUrl: './dcomponent-health.component.html',
  styles: [
  ]
})
export class DcomponentHealthComponent implements OnInit {
  dataForm: FormGroup;
  submitted = false;
  disabled = false;
  driver_id= 0;
  eye_insight_test = null;
  downloadurl = `${environment.apiUrl}/admin/v1/driver/downloadpdf`;

  @Input() vatOptions = [];
  @Input()
  set data(data) {
    this.driver_id = data.id;
    let healthData = data.data;
    this.eye_insight_test = healthData? healthData.eye_insight_test: null;

    this.dataForm = this.formBuilder.group({
      has_long_standing_health_issue: [ healthData ? healthData.has_long_standing_health_issue : true, [] ],
      long_standing_health_issue: [healthData ? healthData.long_standing_health_issue : null, []],
      has_medical_disallow:[healthData ? healthData.has_medical_disallow : true, []],
      medical_disallow:[healthData ? healthData.medical_disallow : null, []],
      has_dvla_condition:[healthData ? healthData.has_dvla_condition : true, []],
      dvla_condition:[healthData ? healthData.dvla_condition : null, []],
      has_routie_medical_incident: [healthData? healthData.has_routie_medical_incident: true],
      routie_medical_incident: [healthData? healthData.routie_medical_incident: null],
      has_eye_insight_test: [healthData? healthData.has_eye_insight_test: true],
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
            this.eye_insight_test = res.filename;
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
      filename: this.eye_insight_test,
      onlyfile: 'yes'
    };
    this.apiService
      .deleteDriverBusinessDocument(params)
      .then(res => {
        let code = res.code;
        if (code == 200) {
          $("#uploader").val("");
          this.eye_insight_test = null;
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
    params.eye_insight_test = this.eye_insight_test;

    const data = {
      form: params
    };
    this.valueChange.emit(data);
  }
}
