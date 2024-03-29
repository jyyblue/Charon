import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomerAddComponent } from "./customer-add/customer-add.component";
import { CustomerEditComponent } from "./customer-edit/customer-edit.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomerShowComponent } from "./customer-show/customer-show.component";
/*********************************** */
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DriverAddComponent } from "./driver-add/driver-add.component";
import { DriverEditComponent } from "./driver-edit/driver-edit.component";
import { DriverListComponent } from "./driver-list/driver-list.component";
import { DriverShowComponent } from "./driver-show/driver-show.component";
import { JobAddComponent } from "./job-add/job-add.component";
import { JobEditComponent } from "./job-edit/job-edit.component";
import { JobImportComponent } from "./job-import/job-import.component";
import { JobListComponent } from "./job-list/job-list.component";
// import { JobListCompleteComponent } from './job-list-complete/job-list-complete.component';
// import { JobListPendingComponent } from './job-list-pending/job-list-pending.component';
// import { JobListPendingPaymentComponent } from './job-list-pending-payment/job-list-pending-payment.component';
// import { JobListQueryComponent } from './job-list-query/job-list-query.component';
// import { JobEditPendingComponent } from './job-edit-pending/job-edit-pending.component';
// import { JobEditPendingPaymentComponent } from './job-edit-pending-payment/job-edit-pending-payment.component';
// import { JobEditQueryComponent } from './job-edit-query/job-edit-query.component';
// import { JobListCpPaymentComponent } from './job-list-cp-payment/job-list-cp-payment.component';
// import { JobEditCpPaymentComponent } from './job-edit-cp-payment/job-edit-cp-payment.component';
import { TemplateListComponent } from "./template-list/template-list.component";
import { TemplateCreateComponent } from "./template-create/template-create.component";
import { TemplateEditComponent } from "./template-edit/template-edit.component";
import { OutboxComponent } from "./outbox/outbox.component";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "customer/add", component: CustomerAddComponent },
  { path: "customer/edit/:id", component: CustomerEditComponent },
  { path: "customer/list", component: CustomerListComponent },
  { path: "customer/show/:id", component: CustomerShowComponent },
  { path: "driver/add", component: DriverAddComponent },
  { path: "driver/edit/:id", component: DriverEditComponent },
  { path: "driver/list", component: DriverListComponent },
  { path: "driver/show/:id", component: DriverShowComponent },
  { path: "job/list", component: JobListComponent },

  { path: "job/add", component: JobAddComponent },
  { path: "job/edit/:id", component: JobEditComponent },

  { path: "import/job", component: JobImportComponent },

  { path: "mail-manager/template/list", component: TemplateListComponent },
  { path: "mail-manager/template/create", component: TemplateCreateComponent },
  { path: "mail-manager/template/edit/:id", component: TemplateEditComponent },
  { path: "mail-manager/outbox", component: OutboxComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
