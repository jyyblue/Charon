import { Component } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'ui-ngx-plyr', // tslint:disable-line
  templateUrl: './ngx-plyr.component.html',
  styleUrls: ['../../../vendor/libs/ngx-plyr/ngx-plyr.scss']
})
export class NgxPlyrComponent {
  constructor(private appService: AppService) {
    this.appService.pageTitle = 'Ngx Plyr - UI elements';
  }
}
