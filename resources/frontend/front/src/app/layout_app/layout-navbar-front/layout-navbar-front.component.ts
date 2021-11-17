import { Component, Input, HostBinding } from '@angular/core';
import { AppService } from '../../app.service';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { Router } from '@angular/router';
import { LayoutAppService } from '../layout_app.service';

@Component({
  selector: 'app-layout-navbar-front',
  templateUrl: './layout-navbar-front.component.html',
  styleUrls: ['./layout-navbar-front.component.scss']
})
export class LayoutNavbarFrontComponent {
  isExpanded = false;
  isRTL: boolean;

  @Input() sidenavToggle = true;

  @HostBinding('class.layout-navbar') hostClassMain = true;

  constructor(
    private appService: AppService, 
    private layoutService: LayoutAppService,
    private authService: AuthServiceService,
    private router: Router
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
    this.authService.logout();
    this.router.navigate(['/']);
  }

  login() {
    this.router.navigate(['/login']);
  }
}
