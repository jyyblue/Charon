import { Component, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'ui-ngx-image-cropper', // tslint:disable-line
  templateUrl: './ngx-image-cropper.component.html'
})
export class NgxImageCropperComponent {
  @ViewChild('cropper', { static: false })
  cropper: ImageCropperComponent;
  croppedImage: any = '';

  constructor(public appService: AppService) {
    this.appService.pageTitle = 'Ngx Image Cropper - UI elements';
  }

  fileChangeListener($event) {
    this.cropper.imageFile = $event.target.files[0];
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
}
