import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from "src/app/shared/services/api.service";
declare var $: any;

@Component({
  selector: 'app-dcomponent-history-mail',
  templateUrl: './dcomponent-history-mail.component.html',
  styles: [
  ]
})
export class DcomponentHistoryMailComponent implements OnInit {
  @Input() email = '';
  perPage = 10;

  filterVal = "";
  currentPage = 1;
  totalItems = 0;
  logData = [];

  delete_id: string;
  logBody = '';
  logTo = '';
  logDate = '';
  logSubject = '';

  constructor(    
    private apiService: ApiService,
    ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
      let params = {
        'page': this.currentPage,
        'pagesize': this.perPage,
        'search': this.filterVal,
        'email': this.email,
      };
      this.apiService.getMailLogs(params).then((res) => {
        this.logData = res.data;
        this.totalItems = res.total;
      }).catch((err) => {
  
      });          
  }
  update() {
    console.log(this.currentPage);
    this.loadData();
  }
  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }
  showContent(id) {
    this.delete_id = id;
    let log = this.logData.find(ele => {return ele.id == id});
    this.logBody = log.body;
    this.logTo = log.to;
    this.logDate = log.date;
    this.logSubject = log.subject;
    $('#logModal').modal('show');
  }
  deleteTemplate(){
    $('#logModal').modal('hide');
  }
}
