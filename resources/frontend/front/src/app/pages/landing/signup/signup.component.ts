import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from './../../../shared/services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmedValidator } from './../../../shared/helper/confirmed.validator';
import { common as Const } from '../../../shared/const/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [AuthServiceService]
})
export class SignupComponent implements OnInit {
  signinForm: FormGroup;
  loading = false;
  submitted = false;
  formVaild = false;
  returnUrl: string;
  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService,
    private toastrService: ToastrService
  ) {
    this.appService.pageTitle = 'Charon';
    this.returnUrl = 'admin/dashboard';
  }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      username: ['Poul', Validators.required],
      email: ['test@admin.com', [Validators.required, Validators.email]],
      password: ['123', Validators.required],
      confirm_password: ['123', Validators.required],
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    });
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.signinForm.controls; }


  onSubmit(): any {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signinForm.invalid) {
      return;
    }

    this.loading = true;
    const params = {
      username: this.f.username.value,
      email: this.f.email.value,
      password: this.f.password.value,
    };

    this.authService.adminregister(params).then((res) => {
      this.loading = false;
      const code = res.code;
      if (code === 200) {
        const data: any = res.data;
        const user = res.user;
        const token = res.token;
        console.log(res);
        localStorage.setItem(Const.USER, JSON.stringify(user));
        localStorage.setItem(Const.TOKEN, token);
        localStorage.setItem(Const.IS_ADMIN, 'true');
        this.router.navigate([this.returnUrl]);
      } else {
        const message = res.message;
        this.toastrService.error(message, 'Info', {
          timeOut: 1500,
        });
      }
    }).catch((err) => {
      this.loading = false;
      console.log(err);
    });
  }

  goSignIn(): any {
    this.router.navigate(['login']);
  }
}
