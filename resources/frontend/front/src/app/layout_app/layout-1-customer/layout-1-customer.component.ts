import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { LayoutAppService } from '../layout_app.service';

@Component({
  selector: 'app-layout-1-customer',
  templateUrl: './layout-1-customer.component.html',
  styles: [':host { display: block; }', ':host ::ng-deep .layout-loading .sidenav-link { transition: none !important; }']
})
export class Layout1CustomerComponent implements AfterViewInit, OnDestroy {
  // Prevent "blink" effect
  public initialized = false;

  constructor(private layoutService: LayoutAppService) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initialized = true;

      this.layoutService.init();
      this.layoutService.update();
      this.layoutService.setAutoUpdate(true);
    });
  }

  ngOnDestroy() {
    setTimeout(() => {
      this.layoutService.destroy();
    });
  }

  closeSidenav() {
    setTimeout(() => {
      this.layoutService.setCollapsed(true);
    });
  }
}
