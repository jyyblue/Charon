import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbCalendar, NgbDate, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';
import { ApiService } from "../../../../../../app/shared/services/api.service";
declare var $: any;
import { environment } from "../../../../../../environments/environment";

@Component({
  selector: 'app-dcomponent-asset',
  templateUrl: './dcomponent-asset.component.html',
  styles: [
  ]
})
export class DcomponentAssetComponent implements OnInit {
  downloadurl = `${environment.apiUrl}/admin/v1/driver/downloadpdf`;

  dataForm: FormGroup;
  submitted = false;
  disabled = false;
  driver_id= 0;
  trainingList = [];
  train_idx: String;
  train = [
    {
      'idx': 'gjs_t_shirt',
      'name': 'GJS T-Shirts',
    },
    {
      'idx': 'gjs_hoodie',
      'name': 'GJS Hoodie',
    },
    {
      'idx': 'gjs_high_vis',
      'name': 'GJS High Vis',
    },
    {
      'idx': 'hard_hat',
      'name': 'Hard Hat',
    },
    {
      'idx': 'steel_toe_cap_boots',
      'name': 'Steel Toe Cap Boots',
    },
    {
      'idx': 'straps',
      'name': 'Straps',
    },
    {
      'idx': 'blankets',
      'name': 'Blankets',
    },
    {
      'idx': 'sack_barrow',
      'name': 'Sack Barrow',
    },
    {
      'idx': 'safey_googles',
      'name': 'Safey Googles',
    },
    {
      'idx': 'gloves',
      'name': 'Gloves',
    },
    {
      'idx': 'pump_truck_lutons_only',
      'name': 'Pump Truck (Lutons Only)',
    },
    {
      'idx': 'nx_on_mobile_phone',
      'name': 'NX on Mobile Phone',
    },
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
      let trainingData = _data.asset ? JSON.parse(_data.asset) : [];
      
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
        'note': '',
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
        'note': element['note'],
      })
    });
    console.log(this.trainingList)
  }

  /**
   * change event in invoice date
   * @param event 
   */
  onDateChange(date: NgbDateStruct, idx: String) {
  }

  onSubmit() {
    console.log("hre");
    this.submitted = true;

    const params = {
      'asset': JSON.stringify(this.trainingList)
    };

    const data = {
      form: params
    };
    this.valueChange.emit(data);
  }
}
