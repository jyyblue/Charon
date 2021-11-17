import { ApiService } from './../../../../shared/services/api.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  filterGender: string;
  filterFree: string;
  perPage: number;
  filterVal: string;
  total: 0;
  page = 1;
  listData: any[];
  tried = false;
  constructor(
    public apiService: ApiService,
    private modalService: NgbModal,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  ChangePage(): void {
    console.log(this.page);
    this.getUserList();
  }

  async getUserList(): Promise<any> {
    const params = {
      'page': this.page,
    };
    const ret = await this.apiService.getUserList(params);
    const code = ret.code;
    if (code === 200) {
      this.total = ret.total;
      this.listData = ret.data;
    }
    this.tried = true;
  }

  open(userid, content, options = {}): any {
    this.modalService.open(content, options).result.then((result) => {
      console.log(`Closed with: ${result}`);
      if (result === 'delete') {
        console.log(userid, 'delete user');
      }
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  userDetail(userid): void {
    this.router.navigate(['admin/customer', userid]);
    console.log(userid);
  }

  editUser(userid): void {
    this.router.navigate(['admin/customer/eidt', userid]);
    console.log(userid);
  }
  searchFilter(): void {
    setTimeout(() => {

    }, 1000);
  }
}
