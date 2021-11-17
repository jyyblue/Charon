import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { common as Const} from '../../shared/const/common';

@Injectable()
export class ServiceBase {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(protected toastrService: ToastrService, protected http: HttpClient) { }

  protected handleError(error: Response | any): Promise<any> {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body['error'] || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    this.toastrService.error('Error when fetching data - ' + errMsg);
    return Promise.reject(errMsg);
  }

  createKey(url: string, params?: any): string {
    return url + (params ? JSON.stringify(params) : '');
  }

  protected getData<T>(url: string, params?: any, handleError: boolean = true): Promise<T> {
    let accessToken = localStorage.getItem(Const.TOKEN);

    let token ='Bearer ' + accessToken;
    if(params == undefined || params == null) {
      params = {};
    }
    params['auth_token'] = token;
    let headers = {'Api-Request-Signature': 'mobile-app-request'};

    return this.http
      .get<T>(url, {
        params,
        'headers': headers
      })
      .toPromise()
      .catch(error => {
        if (handleError) {
          return this.handleError(error);
        } else {
          return Promise.reject(error);
        }
      });
  }

  protected getCachedData<T>(url: string, params?: any, handleError: boolean = true): Promise<T> {
    const key: string = this.createKey(url, params);

    const data: string = sessionStorage.getItem(key);
    if (data) {
      return Promise.resolve(JSON.parse(data) as T);
    } else {
      const promise = this.http
        .get<T>(url, {
          params
        })
        .toPromise()
        .then(response => {
          if (response) {
            sessionStorage.setItem(key, JSON.stringify(response));
          }
          return response;
        })
        .catch(error => {
          if (handleError) {
            return this.handleError(error);
          } else {
            return Promise.reject(error);
          }
        });

      return promise;
    }
  }

  protected postData<T>(url: string, data?: any, params?: any, handleError: boolean = true): Promise<T> {
    let accessToken = localStorage.getItem(Const.TOKEN);

    let token ='Bearer ' + accessToken;
    let headers = {'Authorization': token};
    return this.http
      .post<T>(url, data, {
        params,
        'headers': headers
      })
      .toPromise()
      .catch(error => {
        if (handleError) {
          return this.handleError(error);
        } else {
          return Promise.reject(error);
        }
      });
  }

  protected postDataFetchText(url: string, data?: any, params?: any, handleError: boolean = true): Promise<string> {
    return this.http
      .post(url, data, {
        params,
        responseType: 'text'
      })
      .toPromise()
      .catch(error => {
        if (handleError) {
          return this.handleError(error);
        } else {
          return Promise.reject(error);
        }
      });
  }

  protected deleteData<T>(url: string, params?: any, handleError: boolean = true): Promise<T> {
    return this.http
      .delete<T>(url, {
        params
      })
      .toPromise()
      .catch(error => {
        if (handleError) {
          return this.handleError(error);
        } else {
          return Promise.reject(error);
        }
      });
  }

  protected sanitizeDate(date: string): string {
    if (date) {
      return date.split('-').join('');
    } else {
      return date;
    }
  }

  getDataRxjs(url): Observable<any[]> {
    return this.http.get<any[]>(url)
      .pipe(
        tap(data => JSON.stringify(data)),
        catchError(this.handleErrorRxjs)
      );
  }

  postDataRxjs(url: string, data?: any, params?: any, handleError: boolean = true): Observable<any> {
    let accessToken = localStorage.getItem(Const.TOKEN);

    let token ='Bearer ' + accessToken;
    let headers = {'Authorization': token};
    return this.http
    .post<any>(url, data, {
      params,
      'headers': headers
    })
      .pipe(
        tap(data => JSON.stringify(data)),
        catchError(this.handleErrorRxjs)
      );
  }

  private handleErrorRxjs(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
