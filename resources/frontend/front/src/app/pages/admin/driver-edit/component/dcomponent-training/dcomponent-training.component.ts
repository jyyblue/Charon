import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbCalendar, NgbDate, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';
import { ApiService } from "../../../../../../app/shared/services/api.service";
declare var $: any;
import { environment } from "../../../../../../environments/environment";


@Component({
  selector: 'app-dcomponent-training',
  templateUrl: './dcomponent-training.component.html',
  styles: [".noClick {pointer-events: none;color: #ad9e9e; } .intro {background-color: #e3cfb5 !important;} .refresher {background-color: #bee3b5 !important;}"]
})
export class DcomponentTrainingComponent implements OnInit {
  downloadurl = `${environment.apiUrl}/admin/v1/driver/downloadpdf`;

  dataForm: FormGroup;
  submitted = false;
  disabled = false;
  driver_id= 0;
  trainingList = [];
  train_idx: String;
  train = [
    {
      'idx': 'intro',
      'name': 'Introduction',
      'class': 'intro',
    },
    {
      'idx': 'intro_gjs',
      'name': 'Introduction to GJS',
      'class': 'intro',
    },
    {
      'idx': 'intro_health',
      'name': 'Health and Safety',
      'class': 'intro',
    },
    {
      'idx': 'intro_fors',
      'name': 'FORs',
      'class': 'intro',
    },
    {
      'idx': 'intro_technical',
      'name': 'Technical and Practical',
      'class': 'intro',
    },
    {
      'idx': 'intro_clandestine',
      'name': 'Clandestine Prevntion',
      'class': 'intro',
    },
    {
      'idx': 'intro_other',
      'name': 'Other',
      'class': 'intro',
    },


    {
      'idx': 're',
      'name': 'Refresher',
      'class': 'refresher',
    },
    {
      'idx': 're_health',
      'name': 'Health and Safety',
      'class': 'refresher',
    },
    {
      'idx': 're_fors',
      'name': 'FORs',
      'class': 'refresher',
    },
    {
      'idx': 're_technical',
      'name': 'Technical and Practical',
      'class': 'refresher',
    },
    {
      'idx': 're_clandestine',
      'name': 'Clandestine Prevntion',
      'class': 'refresher',
    },
    {
      'idx': 're_other',
      'name': 'Other',
      'class': 'refresher',
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
      let trainingData = _data.train ? JSON.parse(_data.train) : [];
      
      if ( trainingData.length > 0) {
        this.parseData(trainingData);
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
    this.trainingList = [];
    this.train.forEach(element => {
      this.trainingList.push({
        'idx': element['idx'],
        'name': element['name'],
        'pass': false,
        'tdate': this.convertStrToDate(),
        'expire': '',
        'file': '',
        'class': element['class']
      });
    });
  };
  parseData(trainingData) {
    this.trainingList = [];

    trainingData.forEach(element => {
      this.trainingList.push({
        'idx': element['idx'],
        'name': element['name'],
        'pass': element['pass'],
        'tdate': this.convertStrToDate(element['tdate']),
        'expire': element['expire'],
        'file': element['file'],
        'class': element['class'],
      })
    });
    console.log(this.trainingList)
  }

  /**
   * change event in invoice date
   * @param event 
   */
  onDateChange(date: NgbDateStruct, idx: String) {
    let index = this.trainingList.findIndex(ele => {
      return ele['idx'] === idx;
    })
    let passDate = date.year + "-" + date.month + "-" + date.day;
    let _passDate = moment(passDate);
    let _expire = _passDate.add(6, 'month');
    passDate = moment(_expire).format('YYYY-MM-DD');

    this.trainingList[index]['expire'] = passDate;
  }
  
  uploadDocument(type_id) {
    this.train_idx = type_id;
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
            let index = this.trainingList.findIndex(ele => {
              return ele['idx'] === this.train_idx;
            });
            this.trainingList[index]['file'] = res.filename;
          }
        })
        .catch(err => {
          let status = err.status;
        });
    }
  }

  deleteDocument(idx) {
    let index = this.trainingList.findIndex(ele => {
      return ele['idx'] === idx;
    });
    let filename = this.trainingList[index]['file'];
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
          this.trainingList[index]['file'] = '';
        }
      })
      .catch(err => {
        let status = err.status;
      });
  }

  onSubmit() {
    console.log("hre");
    this.submitted = true;

    const params = {
      'train': JSON.stringify(this.trainingList)
    };

    const data = {
      form: params
    };
    this.valueChange.emit(data);
  }
}
