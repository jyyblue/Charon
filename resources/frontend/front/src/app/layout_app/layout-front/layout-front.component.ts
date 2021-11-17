import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { LayoutAppService } from '../layout_app.service';

@Component({
  selector: 'app-layout-front',
  templateUrl: './layout-front.component.html',
  styles: [':host { display: block; }', ':host ::ng-deep .layout-loading .sidenav-link { transition: none !important; }']
})

export class LayoutFrontComponent  implements AfterViewInit, OnDestroy {
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
