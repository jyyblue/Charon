import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../../../shared/services/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  user: any = {};
  services = [];
  book_class = [];
  comm = [];

  dataForm: FormGroup;
  submitted = false;
  emailIsValid = false;
  
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
  ) {
    this.dataForm = this.formBuilder.group({
      name: [this.user.name ? this.user.name: '', Validators.required],
      account_number: [this.user.account_number? this.user.account_number: '', Validators.required],
      password: ['', [Validators.required]],
    });
   }

   async onSubmit() {
    this.submitted = true;
    if(this.dataForm.invalid){
      return;
    }

    let params = {
      email: this.user.email,
      account_number: this.f.account_number.value,
      name: this.f.name.value,
      password: this.f.password.value,
      customer_id: this.user.id,
    }

    this.apiService.updateCustomerAccount(params).then((res) => {
      const code = res.code;
      let message = res.message;
      if (code === 200) {
        this.toastrService.success(message, 'Info', {
          timeOut: 1500,
        });
      } else {
        this.toastrService.error(message, 'Info', {
          timeOut: 1500,
        });
      }
    }).catch((err) => {
      console.log(err);
    });
   }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.getTableData();
    this.getCustomerDetail(id);
  }

  get f(): any { return this.dataForm.controls; }

  async getTableData() {
    const params = {};
    const ret = await this.apiService.getTableData(params);
    const code = ret.code;
    if (code === 200) {
      this.services = ret.services;
      this.book_class = ret.book_class;
      this.comm = ret.comm;
    }
  }

  async getCustomerDetail(userid) {
    const params = {
      'userid': userid,
    };
    const ret = await this.apiService.getCustomerDetail(params);
    const code = ret.code;
    if (code === 200) {
      this.user = ret.data;
      let _user = ret.data.user;
      if(_user != undefined && _user != null) {
        this.user.name = _user.name;
        this.user.email = _user.email;

        this.dataForm = this.formBuilder.group({
          name: [this.user.name ? this.user.name: '', Validators.required],
          account_number: [this.user.account_number? this.user.account_number: '', Validators.required],
          password: ['', [Validators.required]],
        });
      }
      this.user['services'] = [];
      this.user['book_class_title'] = '';
      this.user['comm'] = [];

      const interest_services = this.user.interest_services;
      if (interest_services != undefined && interest_services != null && interest_services != '') {
        const arr = interest_services.split(',');
        if (arr.length > 0) {
          for (let i = 0; i < arr.length; i++) {
            let val = parseInt(arr[i]);
            let idx = this.services.findIndex(item => {
              return item.id === val;
            });
            this.user['services'].push(this.services[idx].title);
          }
        }
      }

      const bc = parseInt(this.user.book_class);
      if (bc) {
        let idx = this.book_class.findIndex(item => {
          return item.id === bc;
        });
        this.user['book_class_title'] = this.book_class[idx].title;
      }

      const interest_communications = this.user.interest_communications;
      if (interest_communications != undefined && interest_communications != null && interest_communications != '') {
        const arr = interest_communications.split(',');
        if (arr.length > 0) {
          for (let i = 0; i < arr.length; i++) {
            let val = parseInt(arr[i]);
            let idx = this.comm.findIndex(item => {
              return item.id === val;
            });
            this.user['comm'].push(this.comm[idx].title);
          }
        }
      }

      console.log(this.user);
    }
  }


}
