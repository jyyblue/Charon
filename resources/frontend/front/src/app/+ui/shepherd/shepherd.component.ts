import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { AppService } from '../../app.service';
import Shepherd from 'shepherd.js';

@Component({
  selector: 'ui-shepherd', // tslint:disable-line
  templateUrl: './shepherd.component.html',
  styleUrls: ['../../../vendor/libs/shepherd/shepherd.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShepherdComponent implements OnDestroy {
  tour: Shepherd.Tour;

  constructor(appService: AppService) {
    appService.pageTitle = 'Shepherd.js - UI elements';

    const isRtl = appService.isRTL;
    const backButtonClass = 'btn btn-sm btn-secondary md-btn-flat';
    const nextButtonClass = 'btn btn-sm btn-primary';

    this.tour = new Shepherd.Tour({
      defaultStepOptions: {
        scrollTo: false,
        cancelIcon: {
          enabled: true
        }
      },
      useModalOverlay: true
    });

    this.tour.addStep({
      title: 'Title of first step',
      text: '<p>Content of first step</p><p><strong>Second</strong> line</p>',
      attachTo: { element: '#tour-1', on: isRtl ? 'left' : 'right' },
      buttons: [{
        action: this.tour.cancel,
        classes: backButtonClass,
        text: 'Exit'
      }, {
        action: this.tour.next,
        classes: nextButtonClass,
        text: 'Next'
      }]
    });
    this.tour.addStep({
      text: 'Content of second step',
      attachTo: { element: '#tour-2', on: isRtl ? 'right' : 'left' },
      buttons: [{
        action: this.tour.back,
        classes: backButtonClass,
        text: 'Back'
      }, {
        action: this.tour.next,
        classes: nextButtonClass,
        text: 'Next'
      }]
    });
    this.tour.addStep({
      title: 'Title of third step',
      text: 'Content of third step',
      attachTo: { element: '#tour-3', on: 'bottom' },
      buttons: [{
        action: this.tour.back,
        classes: backButtonClass,
        text: 'Back'
      }, {
        action: this.tour.next,
        classes: nextButtonClass,
        text: 'Next'
      }]
    });
    this.tour.addStep({
      title: 'Title of fourth step',
      text: 'Content of fourth step',
      attachTo: { element: '#tour-4', on: 'top' },
      buttons: [{
        action: this.tour.back,
        classes: backButtonClass,
        text: 'Back'
      }, {
        action: this.tour.next,
        classes: nextButtonClass,
        text: 'Next'
      }]
    });
    this.tour.addStep({
      title: 'Floating modal',
      text: 'Content of floating modal step',
      buttons: [{
        action: this.tour.back,
        classes: backButtonClass,
        text: 'Back'
      }, {
        action: this.tour.next,
        classes: nextButtonClass,
        text: 'Next'
      }]
    });
    this.tour.addStep({
      title: 'Title of fifth step',
      text: 'Content of fifth step',
      attachTo: { element: '#tour-5', on: 'bottom' },
      buttons: [{
        action: this.tour.back,
        classes: backButtonClass,
        text: 'Back'
      }, {
        action: this.tour.next,
        classes: nextButtonClass,
        text: 'Done'
      }]
    });
  }

  startTour() {
    this.tour.start();
  }

  ngOnDestroy() {
    if (this.tour) { this.tour.cancel(); }
    this.tour = null;
  }
}
