import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from 'moment';
import { ApiService } from "../../../../../../app/shared/services/api.service";
declare var $: any;
import { environment } from "../../../../../../environments/environment";
import { NgbCalendar, NgbDate, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { DEFAULT_DOCUMENT_LIST, DRIVER_TYPE } from "src/app/shared/const/common";

const hgv_license = 'hgv_license';
const hgv_name = 'HGV License';

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
  documentList: any[] = [];
  initialDocuments = [];
  driver_type = 0;

  tdate: any;
  @Input() vatOptions = [];
  @Input() data: Object;

  @Output() valueChange = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}
  ngOnChanges() {
    if(this.data) {
      this.driver_id = this.data['id'];
      let licenceData = this.data['data'];
      
      this.driver_type = this.data['type'];
      let dType = DRIVER_TYPE[this.driver_type];
      this.initialDocuments = DEFAULT_DOCUMENT_LIST[dType];

      let licence_expiry = null;
      let hgv_licence = licenceData ? (licenceData.hgv_licence === true ? true: false) : false;
      let licence_number = licenceData ? licenceData.licence_number : null;
      if( this.dataForm !== undefined) {
        this.dataForm.patchValue({
          licence_number,
          licence_expiry,
          hgv_licence
        })
      }else{
        this.dataForm = this.formBuilder.group({
          licence_number: [licence_number, [Validators.required]],
          licence_expiry: [licence_expiry, [Validators.required]],
          hgv_licence: [ hgv_licence, [] ],
        });
      }
      this.tdate = this.convertStrToDate(licence_expiry);


      let documentData = licenceData.document ? JSON.parse(licenceData.document) : [];
      
      if ( documentData.length > 0) {
        this.parseData(documentData);
      } else {
        this.initDataDocument();
      }

    }
  }
  initDataDocument() {
    this.documentList = [];
    this.initialDocuments.forEach(element => {
      this.documentList.push({
        'idx': element['idx'],
        'name': element['name'],
        'pass': false,
        'tdate': this.convertStrToDate(),
        'expire': '',
        'file': '',
      });
    });
  };
  convertStrToDate(str = null) {
    let jd = moment();
    let today = {
      year: jd.year(),
      month: jd.month() + 1,
      day: jd.date()
    };
    if ( str == undefined) {
      return today;
    }
    jd = moment(str);
    return {
      year: jd.year(),
      month: jd.month() + 1,
      day: jd.date()
    };
  };
  parseData(documentData) {
    this.documentList = [];

    documentData.forEach(element => {
      if( element['idx'] == hgv_license) {
        this.hgv_licence_upload = element['file'];
        this.dataForm.patchValue({
          'licence_expiry': element['tdate'],
        })
        this.tdate = this.convertStrToDate(element['tdate']);
      }
      this.documentList.push({
        'idx': element['idx'],
        'name': element['name'],
        'pass': element['pass'],
        'tdate': this.convertStrToDate(element['tdate']),
        'expire': element['expire'],
        'file': element['file'],
      })
    });
    console.log(this.documentList)
  }
  onDateChange(date: NgbDateStruct) {
    let passDate = date.year + "-" + date.month + "-" + date.day;
    let _passDate = moment(passDate);
    let _expire = _passDate; //.add(6, 'month');
    passDate = moment(_expire).format('YYYY-MM-DD');
    this.dataForm.patchValue({
      'licence_expiry': passDate,
    })
    console.log(this.dataForm.value)
    console.log(this.f.licence_expiry.value);
  }

  ngOnInit(): void {
    if(this.dataForm === undefined) {
      this.dataForm = this.formBuilder.group({
        licence_number: [ null, [Validators.required]],
        licence_expiry: [ null, []],
        hgv_licence: [ false, [] ],
      });
    }
  }
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

    console.log('there');
    let index = this.documentList.findIndex(item => {
      return item['idx'] === hgv_license;
    })
    if (this.hgv_licence_upload != undefined || this.hgv_licence_upload === '') {
      let hgv_item =
       {
          'idx': hgv_license,
          'name': hgv_name,
          'pass': false,
          'tdate': this.tdate,
          'expire': this.f.licence_expiry.value,
          'file': this.hgv_licence_upload,
        };
        if(index > -1) {
          this.documentList[index] = hgv_item;
        }else{
          this.documentList.push(hgv_item);
        }
    } else {

      if(index > -1) {
        this.documentList.splice(index, 1);
      }
    }
    const params = this.dataForm.value;
    params.hgv_licence_upload = this.hgv_licence_upload;
    params.document = JSON.stringify(this.documentList);
    const data = {
      form: params
    };
    this.valueChange.emit(data);
  }
}
