import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { common as Const } from '../../../shared/const/common';
import { AuthServiceService } from './../../../shared/services/auth-service.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  page = '0';
  reg_data = {};
  progressValue = 0;
  returnUrl: string;
  error = '';

  services = [];
  book_class = [];
  comm = [];
  constructor(
    private appService: AppService,
    private authService: AuthServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private utilService: UtilService
  ) {
    this.appService.pageTitle = 'Charon';
    this.returnUrl = 'admin/dashboard';
  }

  ngOnInit(): any {
    this.reg_data['first_name']  = '';
    this.reg_data['last_name']  = '';
    this.reg_data['email']  = '';
    this.reg_data['home_phone']  = '';
    this.reg_data['mobile_phone']  = '';
    this.reg_data['primary_account']  = '';
    this.reg_data['s_first_name']  = '';
    this.reg_data['s_last_name']  = '';
    this.reg_data['s_email']  = '';
    this.reg_data['s_home_phone']  = '';

    this.reg_data['interest_services']  = '';
    this.reg_data['book_class']  = '';
    this.reg_data['has_account']  = '';
    this.reg_data['other']  = false;
    this.reg_data['other_title']  = '';

    this.reg_data['company_name']  = '';
    this.reg_data['company_reg_number']  = '';
    this.reg_data['postcode']  = '';
    this.reg_data['country']  = '';
    this.reg_data['address1']  = '';
    this.reg_data['address2']  = '';
    this.reg_data['city']  = '';
    this.reg_data['vat']  = '';
    this.reg_data['head_phone_number']  = '';
    this.reg_data['web_url']  = '';

    this.reg_data['is_invoice_contact']  = '';
    this.reg_data['in_first_name']  = '';
    this.reg_data['in_last_name']  = '';
    this.reg_data['in_email']  = '';
    this.reg_data['in_home_phone']  = '';
    this.reg_data['is_invoice_address']  = '';
    this.reg_data['in_country']  = '';
    this.reg_data['in_postcode']  = '';
    this.reg_data['in_city']  = '';
    this.reg_data['in_address1']  = '';
    this.reg_data['in_address2']  = '';

    this.reg_data['interest_communications']  = '';
    this.reg_data['agree_terms']  = '';
  }

  async getTableData() {
    // this.loading = true;
    // const params = {};
    // this.utilService.getPosition().then(pos=>
    //   {
    //      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    //   });
    // const ret = await this.authService.getTableData(params);

    // const code = ret.code;
    // if (code === 200) {
    //   setTimeout(() => {
    //     this.loading = false;
    //   }, 1000);

    //   this.services = ret.services;
    //   this.book_class = ret.book_class;
    //   this.comm = ret.comm;

    //   for(let i=0; i < this.services.length; i++) {
    //     this.services[i]['checked'] = false;
    //   }

    //   for(let i=0; i < this.book_class.length; i++) {
    //     this.book_class[i]['checked'] = false;
    //   }

    //   for(let i=0; i < this.comm.length; i++) {
    //     this.comm[i]['checked'] = false;
    //   }
    // }
  }
  updateData(e) {
    console.log(e);
    this.page = e.page ? e.page : this.page;
    const direction = e.direction;
    if(direction === 'forward') {
      const page = e.page;
      const fData = e.form;
      switch(page) {
        case '0':
          this.progressValue = 0;
          this.reg_data = {};
          break;
        case '2':
          this.progressValue = 25;
          // finish form 1
          this.reg_data['first_name']  = fData.first_name;
          this.reg_data['last_name']  = fData.last_name;
          this.reg_data['email']  = fData.email;
          this.reg_data['home_phone']  = fData.home_phone;
          this.reg_data['mobile_phone']  = fData.mobile_phone;
          this.reg_data['primary_account']  = fData.primary_account;
          this.reg_data['s_first_name']  = fData.s_first_name;
          this.reg_data['s_last_name']  = fData.s_last_name;
          this.reg_data['s_email']  = fData.s_email;
          this.reg_data['s_home_phone']  = fData.s_home_phone;
          break;
        case '3':
          this.progressValue = 50;
          // finish form 2
          this.reg_data['interest_services']  = fData.interest_services;
          this.reg_data['book_class']  = fData.book_class;
          this.reg_data['has_account']  = fData.has_account;
          this.reg_data['other']  = fData.other;
          this.reg_data['other_title']  = fData.other_title;
          break;
        case '4':
          this.progressValue = 75;
          this.reg_data['company_name']  = fData.company_name;
          this.reg_data['company_reg_number']  = fData.company_reg_number;
          this.reg_data['postcode']  = fData.postcode;
          this.reg_data['country']  = fData.country;
          this.reg_data['address1']  = fData.address1;
          this.reg_data['address2']  = fData.address2;
          this.reg_data['city']  = fData.city;
          this.reg_data['vat']  = fData.vat;
          this.reg_data['head_phone_number']  = fData.head_phone_number;
          this.reg_data['web_url']  = fData.web_url;
          break;
        case '5':
          this.progressValue = 100;
          this.reg_data['is_invoice_contact']  = fData.is_invoice_contact;
          this.reg_data['in_first_name']  = fData.in_first_name;
          this.reg_data['in_last_name']  = fData.in_last_name;
          this.reg_data['in_email']  = fData.in_email;
          this.reg_data['in_home_phone']  = fData.in_home_phone;
          this.reg_data['is_invoice_address']  = fData.is_invoice_address;
          this.reg_data['in_country']  = fData.in_country;
          this.reg_data['in_postcode']  = fData.in_postcode;
          this.reg_data['in_city']  = fData.in_city;
          this.reg_data['in_address1']  = fData.in_address1;
          this.reg_data['in_address2']  = fData.in_address2;
          break;
        case '6':
          this.progressValue = 101;
          this.reg_data['interest_communications']  = fData.interest_communications;
          this.reg_data['agree_terms']  = fData.agree_terms;
          // save to database
          this.onSubmit();
          break;
      }
    }
    console.log(this.reg_data);
  }


  loading = false;
  onSubmit(): any {
    // this.loading = true;
    // this.authService.registerCustomer(this.reg_data).then((res) => {
    //   this.loading = false;
    //   const code = res.code;
    //   if (code === 200) {
    //     const data = res.data;
    //     this.page = '555';
    //   } else {
    //     this.page = '5';
    //     const message = res.message;
    //     this.toastrService.error(message, 'Info', {
    //       timeOut: 1500,
    //     });
    //   }
    // }).catch((err) => {
    //   this.loading = false;
    //   console.log(err);
    // });
  }

  goSignup(): any {
    this.router.navigate(['signup']);
  }

  goReset(): any {
    this.router.navigate(['resetpassword']);
  }
}
