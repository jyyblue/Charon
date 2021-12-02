import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerShowComponent } from './customer-show/customer-show.component';
/*********************************** */
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriverAddComponent } from './driver-add/driver-add.component';
import { DriverEditComponent } from './driver-edit/driver-edit.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { DriverShowComponent } from './driver-show/driver-show.component';
import { JobAddComponent } from './job-add/job-add.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { JobImportComponent } from './job-import/job-import.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobListCompleteComponent } from './job-list-complete/job-list-complete.component';
import { JobListPendingComponent } from './job-list-pending/job-list-pending.component';
import { JobListPendingPaymentComponent } from './job-list-pending-payment/job-list-pending-payment.component';
import { JobListQueryComponent } from './job-list-query/job-list-query.component';
import { JobEditPendingComponent } from './job-edit-pending/job-edit-pending.component';
import { JobEditPendingPaymentComponent } from './job-edit-pending-payment/job-edit-pending-payment.component';
import { JobEditQueryComponent } from './job-edit-query/job-edit-query.component';
import { JobListCpPaymentComponent } from './job-list-cp-payment/job-list-cp-payment.component';
import { JobEditCpPaymentComponent } from './job-edit-cp-payment/job-edit-cp-payment.component';

const routes: Routes = [
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'customer/add', component: CustomerAddComponent },
	{ path: 'customer/edit/:id', component: CustomerEditComponent },
	{ path: 'customer/list', component: CustomerListComponent },
	{ path: 'customer/show/:id', component: CustomerShowComponent },
	{ path: 'driver/add', component: DriverAddComponent },
	{ path: 'driver/edit/:id', component: DriverEditComponent },
	{ path: 'driver/list', component: DriverListComponent },
	{ path: 'driver/show/:id', component: DriverShowComponent },
	{ path: 'job/list', component: JobListComponent },

	{ path: 'job/list-complete', component: JobListCompleteComponent },
	{ path: 'job/list-pending', component: JobListPendingComponent },
	{ path: 'job/list-pending-payment', component: JobListPendingPaymentComponent },
	{ path: 'job/list-cp-payment', component: JobListCpPaymentComponent },
	{ path: 'job/list-query', component: JobListQueryComponent },

	{ path: 'job/add', component: JobAddComponent },
	{ path: 'job/edit/:id', component: JobEditComponent },
	{ path: 'job/edit-pending/:id', component: JobEditPendingComponent },
	{ path: 'job/edit-query/:id', component: JobEditQueryComponent },
	{ path: 'job/edit-pending-payment/:id', component: JobEditPendingPaymentComponent },
	{ path: 'job/edit-cp-payment/:id', component: JobEditCpPaymentComponent },
	
	{ path: 'import/job', component: JobImportComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class AdminRoutingModule { }
