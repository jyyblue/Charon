import { Component, Input, HostBinding } from '@angular/core';
import { AppService } from '../../app.service';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LayoutAppService } from '../layout_app.service';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styles: [':host { display: block; }']
})
export class LayoutNavbarComponent {
  isExpanded = false;
  isRTL: boolean;

  @Input() sidenavToggle = true;

  @HostBinding('class.layout-navbar') hostClassMain = true;

  constructor(
    private appService: AppService, 
    private layoutService: LayoutAppService,
    private authService: AuthServiceService,
    private router: Router,
    private toastrService: ToastrService,
    ) {
    this.isRTL = appService.isRTL;
  }

  currentBg() {
    return `bg-${this.appService.layoutNavbarBg}`;
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }

  logout() {
    this.authService.adminlogout(null).then((res) => {
      // this.loading = false;
      const code = res.code;
      if (code === 200) {
        this.authService.logout();
        this.router.navigate(['/']);
        this.toastrService.success('You are Logged out Successfully', 'Info', {
          timeOut: 1500,
        });
      } else {
        const message = res.message;
        this.toastrService.error(message, 'Info', {
          timeOut: 1500,
        });
      }
    }).catch((err) => {
      // this.loading = false;
      console.log(err);
    });
  }

  profile() {
    console.log('profile');
    this.router.navigate(['customer/profile']);
  }

  setting() {
    this.router.navigate(['customer/chat']);
  }
}
