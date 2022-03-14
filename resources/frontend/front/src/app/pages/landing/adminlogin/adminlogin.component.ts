import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { common as Const } from '../../../shared/const/common';
import { AuthServiceService } from './../../../shared/services/auth-service.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private appService: AppService,
    private authService: AuthServiceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
  ) {
    this.appService.pageTitle = 'Charon';
    this.returnUrl = 'admin/dashboard';
  }

  ngOnInit(): any {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f(): any { return this.loginForm.controls; }

  onSubmit(): any {
    // this.router.navigate([this.returnUrl]);
    // return;
    // alert('here');
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const params = {
      email: this.f.email.value,
      password: this.f.password.value
    };

    this.authService.adminlogin(params).then((res) => {
      this.loading = false;
      const code = res.code;
      if (code === 200) {
        const user = res.user;
        const token = res.token;
        const role_id = user.role;
        localStorage.setItem(Const.USER, JSON.stringify(user));
        localStorage.setItem(Const.TOKEN, token);
        localStorage.setItem(Const.ROLE, Const.ROLE_TYPE.ADMIN);

        if(role_id == 1) {
          // admin
          this.router.navigate([this.returnUrl]);

          // this.router.navigate(['customer/profile']);
        }else{
          this.router.navigate(['customer/profile']);
        }
        this.toastrService.success('You are Logged In Successfully', 'Info', {
          timeOut: 1500,
        });
      } else {
        const message = res.message;
        this.toastrService.error(message, 'Info', {
          timeOut: 1500,
        });
      }
    }).catch((err) => {
      this.loading = false;
      const message = err.error.message;
      this.toastrService.error(message, 'Error', {
        timeOut: 1500,
      });
    });
  }

  goSignup(): any {
    this.router.navigate(['signup']);
  }

  goReset(): any {
    this.router.navigate(['resetpassword']);
  }
}

