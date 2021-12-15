import { ServiceBase } from './service-base.service';
import { Injectable, OnDestroy } from '@angular/core';

import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { Profile } from '../models/profile.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { common as Const } from '../const/common';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService extends ServiceBase implements OnDestroy {
  subject: Subject<any>;
  subscription: Subscription;
  profile: Profile;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(protected toastrService: ToastrService, protected http: HttpClient, protected appService: AppService) {
    super(toastrService, http, appService);
    this.subject = new ReplaySubject(1);
    this.subscription = this.subject.pipe(debounceTime(500)).subscribe(params => this.postDefaultTheme(params));
    const cu = localStorage.getItem(Const.USER);
    if (!cu) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }
  ngOnDestroy(): any {
    this.subscription.unsubscribe();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public getToken(): string {
    return localStorage.getItem(Const.TOKEN);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(Const.TOKEN);
    console.log(token);
    if (!token) {
      return false;
    }
    return true;
  }

  isAdmin(): boolean {
    const isAdmin = localStorage.getItem(Const.ROLE);
    if (isAdmin === Const.ROLE_TYPE.ADMIN) {
      return true;
    } else {
      return false;
    }
  }

  userRole(): string {
    const userrole = localStorage.getItem(Const.ROLE);
    return userrole;
  }

  getUserId(): number {
    try {
      const user = JSON.parse(localStorage.getItem(Const.USER));
      if (user) {
        return user.id;
      }
      return 0;
    } catch (error) {
      return 0;
    }
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem(Const.USER);
    localStorage.removeItem(Const.TOKEN);
    localStorage.removeItem(Const.IS_ADMIN);
    localStorage.removeItem(Const.ROLE);
    localStorage.removeItem('default_rest_id');
    localStorage.removeItem('rest_status');
    localStorage.removeItem('rest_name');
    // this.currentUserSubject.next(null);
  }

  public adminlogin(params: any): Promise<any> {
    return this.postData<any>(`${environment.apiUrl}/admin/auth/login`, params, null, false);
  }

  public adminlogout(params: any): Promise<any> {
    return this.postData<any>(`${environment.apiUrl}/admin/auth/logout`, params, null, false);
  }
  
  private postDefaultTheme(params: any): Promise<Profile> {
    return this.postData<Profile>('/api/profile/default-theme', null, params, false);
  }

  public adminregister(params: any): Promise<any> {
    return this.postData<any>(`${environment.apiUrl}/admin/auth/register`, params, null, false);
  }
}
