import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
{ path: '', component: AdminloginComponent },
{ path: 'login', component: AdminloginComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'resetpassword', component: ResetPasswordComponent },
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LandingRoutingModule { }
