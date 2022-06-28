import { AdminRoutingModule } from "./admin-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule as Ng2ChartsModule } from "ng2-charts";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { QuillModule } from "../../../vendor/libs/quill/quill.module";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

import { DropzoneModule } from "ngx-dropzone-wrapper";
import { NgxSummernoteModule } from "ngx-summernote";
import { DriverListComponent } from "./driver-list/driver-list.component";
import { DriverAddComponent } from "./driver-add/driver-add.component";
import { DriverEditComponent } from "./driver-edit/driver-edit.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomerAddComponent } from "./customer-add/customer-add.component";
import { CustomerEditComponent } from "./customer-edit/customer-edit.component";
import { JobListComponent } from "./job-list/job-list.component";
import { JobAddComponent } from "./job-add/job-add.component";
import { JobImportComponent } from "./job-import/job-import.component";
import { JobEditComponent } from "./job-edit/job-edit.component";
import { CustomerShowComponent } from "./customer-show/customer-show.component";
import { DriverShowComponent } from "./driver-show/driver-show.component";
import { CustomDaterangePicker2Component } from "./custom-daterange-picker/custom-daterange-picker.component";
import { TextMaskModule } from "angular2-text-mask";
import { NgSelectModule } from "@ng-select/ng-select";
import { FileUploadModule } from "ng2-file-upload";
import { InlineEditComponent } from "./job-list/component/inline-edit/inline-edit.component";
import { InlineAddComponent } from "./job-list/component/inline-add/inline-add.component";
import { JobListHeaderComponent } from "./job-list/component/job-list-header/job-list-header.component";
import { TemplateListComponent } from "./template-list/template-list.component";
import { TemplateCreateComponent } from "./template-create/template-create.component";
import { TemplateEditComponent } from "./template-edit/template-edit.component";
import { OutboxComponent } from "./outbox/outbox.component";
import { DriverDetailTabComponent } from "./driver-show/component/driver-detail-tab/driver-detail-tab.component";
import { DcomponentBasicComponent } from "./driver-edit/component/dcomponent-basic/dcomponent-basic.component";
import { DcomponentDetailComponent } from "./driver-edit/component/dcomponent-detail/dcomponent-detail.component";
import { DcomponentFinancialDetailComponent } from "./driver-edit/component/dcomponent-financial-detail/dcomponent-financial-detail.component";
import { DcomponentBusinessComponent } from "./driver-edit/component/dcomponent-business/dcomponent-business.component";
import { DcomponentHistoryJobComponent } from './driver-edit/component/history/dcomponent-history-job/dcomponent-history-job.component';
import { DcomponentHistoryPaymentComponent } from './driver-edit/component/history/dcomponent-history-payment/dcomponent-history-payment.component';
import { DcomponentHistoryMailComponent } from './driver-edit/component/history/dcomponent-history-mail/dcomponent-history-mail.component';
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
    InlineEditComponent,
    InlineAddComponent,
    JobListHeaderComponent,
    TemplateListComponent,
    TemplateCreateComponent,
    TemplateEditComponent,
    OutboxComponent,
    DriverDetailTabComponent,
    DcomponentBasicComponent,
    DcomponentDetailComponent,
    DcomponentFinancialDetailComponent,
    DcomponentBusinessComponent,
    DcomponentHistoryJobComponent,
    DcomponentHistoryPaymentComponent,
    DcomponentHistoryMailComponent
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
    SweetAlert2Module
  ]
})
export class AdminModule {}
