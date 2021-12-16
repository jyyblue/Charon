import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from '../../../vendor/libs/quill/quill.module';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgxSummernoteModule } from 'ngx-summernote';
import { DriverListComponent } from './driver-list/driver-list.component';
import { DriverAddComponent } from './driver-add/driver-add.component';
import { DriverEditComponent } from './driver-edit/driver-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobAddComponent } from './job-add/job-add.component';
import { JobImportComponent } from './job-import/job-import.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { CustomerShowComponent } from './customer-show/customer-show.component';
import { DriverShowComponent } from './driver-show/driver-show.component';
import { CustomDaterangePicker2Component } from './custom-daterange-picker/custom-daterange-picker.component';
import { TextMaskModule } from 'angular2-text-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from 'ng2-file-upload';
import { JobListCompleteComponent } from './job-list-complete/job-list-complete.component';
import { JobListPendingPaymentComponent } from './job-list-pending-payment/job-list-pending-payment.component';
import { JobListQueryComponent } from './job-list-query/job-list-query.component';
import { JobListPendingComponent } from './job-list-pending/job-list-pending.component';
import { JobEditPendingComponent } from './job-edit-pending/job-edit-pending.component';
import { JobEditPendingPaymentComponent } from './job-edit-pending-payment/job-edit-pending-payment.component';
import { JobEditQueryComponent } from './job-edit-query/job-edit-query.component';
import { JobListCpPaymentComponent } from './job-list-cp-payment/job-list-cp-payment.component';
import { JobEditCpPaymentComponent } from './job-edit-cp-payment/job-edit-cp-payment.component';
import { InlineEditComponent } from './job-list/component/inline-edit/inline-edit.component';
import { InlineAddComponent } from './job-list/component/inline-add/inline-add.component';
import { JobListHeaderComponent } from './job-list/component/job-list-header/job-list-header.component';
import { PodEmailSendComponent } from './pod-email-send/pod-email-send.component';

@NgModule({
  declarations: [
    CustomDaterangePicker2Component,
    DashboardComponent,
    DriverListComponent,
    DriverAddComponent,
    DriverEditComponent,
    DriverShowComponent,
    CustomerListComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerShowComponent,
    JobListComponent,
    JobAddComponent,
    JobImportComponent,
    JobEditComponent,
    JobListCompleteComponent,
    JobListPendingPaymentComponent,
    JobListQueryComponent,
    JobListPendingComponent,
    JobEditPendingComponent,
    JobEditPendingPaymentComponent,
    JobEditQueryComponent,
    JobListCpPaymentComponent,
    JobEditCpPaymentComponent,
    InlineEditComponent,
    InlineAddComponent,
    JobListHeaderComponent,
    PodEmailSendComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    Ng2ChartsModule,
    PerfectScrollbarModule,
    DropzoneModule,
    NgxSummernoteModule,
    TextMaskModule,
    NgSelectModule,
    FileUploadModule,
    QuillModule,
  ]
})
export class AdminModule { }
