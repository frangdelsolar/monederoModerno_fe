import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authSvc.isAuthenticatedObservable.pipe(
      map((auth) => {
        if (!auth) {
          return true;
        }
        return false;
      })
    );
  }
}
