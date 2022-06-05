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
export class AersApiService extends ServiceBase {
  constructor(
    protected toastrService: ToastrService,
    protected http: HttpClient,
    protected appService: AppService
  ) {
    super(toastrService, http, appService);
  }

  public getEventList(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/aers/event/getList`,
      params,
      null,
      false
    );
  }

  public scrapeEvents(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/aers/event/scrapeEvents`,
      params,
      null,
      false
    );
  }

  public getScrapeSetting(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/aers/event/getScrapeSetting`,
      params,
      null,
      false
    );
  }

  public getEventDetail(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/aers/event/getEventDetail`,
      params,
      null,
      false
    );
  }

  public deleteEvents(params: any): Promise<any> {
    return this.postData<any>(
      `${environment.apiUrl}/aers/event/deleteEvents`,
      params,
      null,
      false
    );
  }

  public exportEvents(params: any) {
    return this.getData<any>(
      `${environment.apiUrl}/aers/event/exportEvents`,
      params,
      null
    );
  }
}
