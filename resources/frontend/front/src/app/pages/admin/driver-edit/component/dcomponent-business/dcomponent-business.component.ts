import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbCalendar, NgbDate, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';
import { ApiService } from "../../../../../../app/shared/services/api.service";
declare var $: any;
import { environment } from "../../../../../../environments/environment";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: "app-dcomponent-business",
  templateUrl: "./dcomponent-business.component.html",
  styles: [".noClick {pointer-events: none;color: #ad9e9e; }"],
})
export class DcomponentBusinessComponent implements OnInit {
  downloadurl = `${environment.apiUrl}/admin/v1/driver/downloadpdf`;

  dataForm: FormGroup;
  submitted = false;
  disabled = false;
  driver_id= 0;
  documentList = [];
  document_idx: String;
  new_document_name= '';
  initialDocuments = [
    {
      'idx': 'operators_licence',
      'name': 'Operators Licence',
    },
    {
      'idx': 'fleet_vehicle_insurance',
      'name': 'Fleet / Vehicle Insurance',
    },
    {
      'idx': 'vat_certificate',
      'name': 'VAT Certificate',
    },
    {
      'idx': 'work_permit',
      'name': 'Work Permit',
    },
    {
      'idx': 'driving_licence',
      'name': 'Driving Licence',
    },
    {
      'idx': 'driver_cpc',
      'name': 'Driver CPC',
    },
    {
      'idx': 'eye_sight_test',
      'name': 'Eye Sight Test',
    },
    {
      'idx': 'uniform_issue_form',
      'name': 'Uniform Issue Form',
    }
  ];
  @Input() vatOptions = [];
  @Input() data: Object;

  @Output() valueChange = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private calendar: NgbCalendar,
  ) {}
  ngOnChanges() {
    if(this.data) {
      this.driver_id = this.data['id'];
      console.log('this.driver_id', this.driver_id);
      let _data = this.data['data'];
      let documentData = _data.document ? JSON.parse(_data.document) : [];
      
      if ( documentData.length > 0) {
        this.parseData(documentData);
      } else {
        this.initData();
      }
    }
  }

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

  ngOnInit(): void {

  }
  initData() {
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
  parseData(documentData) {
    this.documentList = [];

    documentData.forEach(element => {
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

  /**
   * change event in invoice date
   * @param event 
   */
  onDateChange(date: NgbDateStruct, idx: String) {
    let index = this.documentList.findIndex(ele => {
      return ele['idx'] === idx;
    })
    let passDate = date.year + "-" + date.month + "-" + date.day;
    let _passDate = moment(passDate);
    let _expire = _passDate.add(6, 'month');
    passDate = moment(_expire).format('YYYY-MM-DD');

    this.documentList[index]['expire'] = passDate;
  }
  
  uploadDocument(type_id) {
    this.document_idx = type_id;
    console.log(type_id);
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
      params.append("onlyfile", 'true');
      this.apiService
        .uploadDriverBusinessDocument(params)
        .then(res => {
          let code = res.code;
          if (code == 200) {
            $("#uploader").val("");
            let index = this.documentList.findIndex(ele => {
              return ele['idx'] === this.document_idx;
            });
            this.documentList[index]['file'] = res.filename;
          }
        })
        .catch(err => {
          let status = err.status;
        });
    }
  }

  deleteDocument(idx, deleteItem = false) {
    let index = this.documentList.findIndex(ele => {
      return ele['idx'] === idx;
    });
    let filename = this.documentList[index]['file'];
    let params = {
      driver_id: this.driver_id,
      filename: filename,
      onlyfile: 'yes'
    };
    this.apiService
      .deleteDriverBusinessDocument(params)
      .then(res => {
        let code = res.code;
        if (code == 200) {
          $("#uploader").val("");
          this.documentList[index]['file'] = '';
          if( deleteItem === true ) {
            const itemIdx = this.documentList.findIndex(item => {
              return item.idx === idx;
            })
            if(itemIdx > -1) {
              this.documentList.splice(itemIdx, 1);
            }
          }
        }
      })
      .catch(err => {
        let status = err.status;
      });
  }

  addNewDocument() {
    const uuid = uuidv4();
    const name = this.new_document_name;
    let newDoc = {
      'idx': uuid,
      'name': name,
      'pass': false,
      'tdate': this.convertStrToDate(),
      'expire': '',
      'file': '',
    };
    this.documentList.push(newDoc);
    this.new_document_name = '';
    $('#newDocumentModal').modal('hide');
  }

  onModalClose() {
    this.new_document_name = '';
    $('#newDocumentModal').modal('hide');
  }

  onSubmit() {
    this.submitted = true;

    const params = {
      'document': JSON.stringify(this.documentList)
    };

    const data = {
      form: params
    };
    this.valueChange.emit(data);
  }
}
