import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ApiService } from 'src/app/shared/services/api.service';
declare var $: any;

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styles: [
  ]
})
export class TemplateListComponent implements OnInit {

  ngOnInit(): void {
  }
  constructor(
    private http: HttpClient, 
    private appService: AppService,
    private router: Router,
    private apiService: ApiService,
    ) {
    this.appService.pageTitle = 'Mail Template List';
    this.loadData();
  }

  // Filters

  filterVerified = 'Any';
  filterRole = 'Any';
  filterStatus = 'Any';
  filterLatestActivity = [null, null];


  // Table

  // Options
  dataUrl = 'assets/json/pages_users_list.json';
  searchKeys = ['id', 'account', 'email', 'name'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 10;

  currentPage = 1;
  totalItems = 0;

  usersData: object[] = [];
  originalUsersData: object[] = [];
  templateData = [];
  delete_id: string;
  loadData() {
    let params = {
      'page': this.currentPage,
      'pagesize': this.perPage,
    };
    this.apiService.getMailTemplateList(params).then((res) => {
      this.templateData = res.data;
      this.totalItems = res.total;
    }).catch((err) => {

    });    
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    this.loadData();
  }

  paginate(data) {
    const perPage = parseInt(String(this.perPage), 10);
    const offset = (this.currentPage - 1) * perPage;

    return data.slice(offset, offset + perPage);
  }

  editTemplate(id) {
    this.router.navigate(['admin/mail-manager/template/edit', id]);
  }

  createTemplate() {
    this.router.navigate(['admin/mail-manager/template/create']);
  }

  showDeleteModal(id) {
    this.delete_id = id;
    $('#deleteModal').modal('show');
  }

  deleteTemplate() {
    $('#deleteModal').modal('hide');

    let params = {
      id: this.delete_id
    }
    this.appService.showLoading();
    this.apiService.deleteTemplate(params).then(res => {
      this.appService.hideLoading();
      let code = res.code;
      if(code == 200) {
        this.currentPage = 1;
        this.loadData();
      }
    }).catch(err => {
      this.appService.hideLoading();
    })
  }

  cancelDelete() {
    $('#deleteModal').modal('hide');
  }
}