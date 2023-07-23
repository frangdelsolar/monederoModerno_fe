import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class PrivateApiService {
  private _headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private toastSvc: ToastService,
    private router: Router
  ) {
    let token = localStorage.getItem('access');

    if (token) {
      token = `Bearer ${token}`;
      this._headers = new HttpHeaders({
        Authorization: token,
      });
    }
  }

  private handleError = (error: any) => {
    const toastData = {
      severity: 'error',
      summary: 'Error',
      detail: error.message,
    };
    this.toastSvc.add(toastData);
    if (error.status === 403) {
      window.location.href = 'auth/login';
    }

    return throwError(error);
  };

  public get<T>(
    url: string,
    id: number | null,
    activateHeader: boolean = false
  ): Observable<T> {
    if (id != null) {
      url += `${id}/`;
    }
    return this.http
      .get<T>(url, activateHeader ? { headers: this._headers } : {})
      .pipe(catchError(this.handleError));
  }

  public post<T>(
    url: string,
    body: any,
    activateHeader: boolean = false
  ): Observable<T> {
    return this.http
      .post<T>(url, body, activateHeader ? { headers: this._headers } : {})
      .pipe(catchError(this.handleError));
  }

  public put<T>(
    url: string,
    body: any,
    activateHeader: boolean = false
  ): Observable<T> {
    return this.http
      .put<T>(url, body, activateHeader ? { headers: this._headers } : {})
      .pipe(catchError(this.handleError));
  }

  public patch<T>(
    url: string,
    body: {},
    activateHeader: boolean = true
  ): Observable<T> {
    return this.http
      .patch<T>(
        url,
        body ? body : {},
        activateHeader ? { headers: this._headers } : {}
      )
      .pipe(catchError(this.handleError));
  }

  public delete<T>(url: string, activateHeader: boolean = true): Observable<T> {
    return this.http
      .delete<T>(url, activateHeader ? { headers: this._headers } : {})
      .pipe(catchError(this.handleError));
  }

  public downloadFile(url: string, activateHeader: boolean = true): any {
    return this.http
      .get(url, { responseType: 'blob', headers: this._headers })
      .pipe(catchError(this.handleError));
  }
}
