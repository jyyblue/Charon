import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';
import { common as Const } from '../../../shared/const/common';

@Component({
  selector: 'app-job-import',
  templateUrl: './job-import.component.html',
  styles: [
  ],
  styleUrls: [
    './file-upload.scss'
  ]
})
export class JobImportComponent implements OnInit {
  uploader;
  uploaderCustomer;
  uploaderDriver;
  constructor(private appService: AppService) {
    this.appService.pageTitle = 'Import Job';
    let accessToken = localStorage.getItem(Const.TOKEN);

    let token ='Bearer ' + accessToken;
    // let headers = {'Authorization': token};
    this.uploader =  new FileUploader(
      {
          url: `${environment.apiUrl}/admin/v1/user/import`,
          isHTML5: true,
          method: 'POST',
          itemAlias: 'file',
          authTokenHeader:  'authorization',
          authToken: token,
       });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploaderCustomer =  new FileUploader(
      {
          url: `${environment.apiUrl}/admin/v1/user/importCustomer`,
          isHTML5: true,
          method: 'POST',
          itemAlias: 'file',
          authTokenHeader:  'authorization',
          authToken: token,
       });
    this.uploaderCustomer.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploaderDriver =  new FileUploader(
      {
          url: `${environment.apiUrl}/admin/v1/user/importDriver`,
          isHTML5: true,
          method: 'POST',
          itemAlias: 'file',
          authTokenHeader:  'authorization',
          authToken: token,
       });
    this.uploaderDriver.onAfterAddingFile = (file) => { file.withCredentials = false; };
  }

  ngOnInit(): void {
  }

  hasBaseDropZoneOver = false;

  fileOver(e: any) {
    this.hasBaseDropZoneOver = e;
  }
}
