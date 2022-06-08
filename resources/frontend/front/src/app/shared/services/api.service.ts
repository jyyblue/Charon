import { ServiceBase } from "./service-base.service";
import { Injectable, OnDestroy } from "@angular/core";

import { environment } from "../../../environments/environment";
import { User } from "../models/user";
import { of, ReplaySubject, Subject, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { debounceTime } from "rxjs/operators";
import { Profile } from "../models/profile.model";
import { BehaviorSubject, Observable } from "rxjs";
import { common as Const } from "../const/common";
import { AppService } from "src/app/app.service";
@Injectable({
  providedIn: "root"
})
export class ApiService extends ServiceBase {
  constructor(
    protected toastrService: ToastrService,
    protected http: HttpClient,
    protected appService: AppService
  ) {
    super(toastrService, http, appService);
  }

  public getUserProfile(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/${params.username}`,
      params,
      null,
      false
    );
  }

  public getUserList(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/customer/list`,
      params,
      null,
      false
    );
  }

  public getCustomerDetail(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/customer/detail`,
      params,
      null,
      false
    );
  }

  public updateCustomerAccount(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/customer/update`,
      params,
      null,
      false
    );
  }

  public storeCustomerAccount(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/customer/store`,
      params,
      null,
      false
    );
  }

  public getTableData(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/customer/auth/getTableData`,
      params,
      null,
      false
    );
  }

  public saveTask(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/task/create`,
      params,
      null,
      false
    );
  }

  public getTaskList(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/task/list`,
      params,
      null,
      false
    );
  }

  public getDriverList(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/driver/list`,
      params,
      null,
      false
    );
  }

  public getDriverDetail(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/driver/detail`,
      params,
      null,
      false
    );
  }

  public getDriverOptions(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/driver/options`,
      params,
      null,
      false
    );
  }

  public updateDriver(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/driver/update`,
      params,
      null,
      false
    );
  }

  public storeDriver(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/driver/store`,
      params,
      null,
      false
    );
  }

  public getDriverDocumentData(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/driver/documentData`,
      params,
      null,
      false
    );
  }
  public uploadDriverBusinessDocument(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/driver/uploadDriverBusinessDocument`,
      params,
      null,
      false
    );
  }

  public deleteDriverBusinessDocument(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/driver/deleteDriverBusinessDocument`,
      params,
      null,
      false
    );
  }

  public getTaskDetail(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/task/detail`,
      params,
      null,
      false
    );
  }

  // public updateTask(params: any): Promise<any> {
  //   return this.postData<any>(`${environment.apiUrl}/admin/v1/task/update`, params, null, false);
  // }

  public updateTaskAuto(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/task/updateAuto`,
      params,
      null,
      false
    );
  }

  public downloadPodFile(params: any): Promise<any> {
    return this.getData<any>(
      `${environment.apiUrl}/admin/v1/task/downloadpod`,
      params,
      null
    );
  }

  // public updatePendingTask(params: any): Promise<any> {
  //   return this.postData<any>(`${environment.apiUrl}/admin/v1/task/updatePendingTask`, params, null, false);
  // }

  public updatePendingPaymentTasks(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/task/updatePendingPaymentTasks`,
      params,
      null,
      false
    );
  }

  public disputeTask(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/task/disputeTask`,
      params,
      null,
      false
    );
  }

  public resolveDisputeTask(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/task/resolveDisputeTask`,
      params,
      null,
      false
    );
  }

  public getJobOptions(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/job/options`,
      params,
      null,
      false
    );
  }

  public getTaskStatus(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/task/status`,
      params,
      null,
      false
    );
  }

  public getDashboardData(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/getDashboardData`,
      params,
      null,
      false
    );
  }

  // public getPodEmailTemplate(params: any): Promise<any> {
  //   return this.postData<any>(`${environment.apiUrl}/admin/v1/getPodEmailTemplate`, params, null, false);
  // }

  public sendPodMail(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/sendPodMail`,
      params,
      null,
      false
    );
  }

  // mail manager api
  public getTemplate(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/mail/template/getTemplate`,
      params,
      null,
      false
    );
  }

  public checkTemplate(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/mail/template/checkMailTeamplte`,
      params,
      null,
      false
    );
  }

  public storeTemplate(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/mail/template/store`,
      params,
      null,
      false
    );
  }

  public getMailTemplateList(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/mail/template/list`,
      params,
      null,
      false
    );
  }

  public deleteTemplate(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/mail/template/delete`,
      params,
      null,
      false
    );
  }

  public updateTemplate(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/mail/template/update`,
      params,
      null,
      false
    );
  }

  public getMailLogs(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/admin/v1/mail/logs/list`,
      params,
      null,
      false
    );
  }
  /**
   * call with Rxjs
   */

  getCustomerList(term: string = null): Observable<any[]> {
    let params = {
      search: term
    };
    return this.postDataRxjs(
      `${environment.apiUrl}/admin/v1/user/list`,
      params,
      null,
      false
    );
  }
}
