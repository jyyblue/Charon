import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LandingRoutingModule } from './landing-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegBox1Component } from './login/component/reg-box1/reg-box1.component';
import { RegBoxComponent } from './login/component/reg-box/reg-box.component';
import { RegBox2Component } from './login/component/reg-box2/reg-box2.component';
import { RegBox3Component } from './login/component/reg-box3/reg-box3.component';
import { RegBox4Component } from './login/component/reg-box4/reg-box4.component';
import { RegBox5Component } from './login/component/reg-box5/reg-box5.component';
import { RegConfirmationComponent } from './login/component/reg-confirmation/reg-confirmation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    RegBoxComponent,
    RegBox1Component,
    RegBox2Component,
    RegBox3Component,
    RegBox4Component,
    RegBox5Component,
    RegConfirmationComponent,
    AdminloginComponent,
    HomeComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LandingRoutingModule,
    NgbModule
  ]
})
export class LandingModule { }
