import { Component, ViewChild } from '@angular/core';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { AppService } from '../../app.service';

@Component({
  selector: 'cui-ngx-image-cropper', // tslint:disable-line
  templateUrl: './cui-ngx-image-cropper.component.html'
})
export class CuiNgxImageCropperComponent {
  @ViewChild('cropper', { static: false })
  cropper: ImageCropperComponent;
  croppedImage: any = '';

  constructor(public appService: AppService) {}

  fileChangeListener($event) {
    this.cropper.imageFile = $event.target.files[0];
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
}
