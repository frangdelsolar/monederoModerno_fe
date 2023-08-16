import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { initializeApp } from 'firebase/app';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../controllers/user.controller';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<any>(
    null
  );
  private user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  loading: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  constructor(
    public afAuth: AngularFireAuth,
    private userSvc: UserService,
    private router: Router,
    private toastSvc: ToastService
  ) {
    initializeApp(environment.firebase);
    this.checkFirebaseAuthState();
    if (localStorage.getItem('user') != null) {
      this.isAuthenticated.next(true);
    }
  }

  get isAuthenticatedObservable(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get userObservable(): Observable<boolean> {
    return this.user.asObservable();
  }

  checkFirebaseAuthState() {
    this.loading.next(true);
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.login(user, false, 'checkFirebaseAuthState').subscribe(
          (loggedIn) => {
            this.loading.next(false);
          }
        );
      } else {
        this.loading.next(false);
        this.logout();
      }
    });
  }

  checkIfUserExistsInBackend(userData: any): Observable<boolean> {
    return this.userSvc.validateUser(userData).pipe(
      map((data: any) => data.user_exists),
      catchError(() => of(false))
    );
  }

  login(
    firebaseUser: any,
    allowRegistration: boolean,
    invoker: string
  ): Observable<boolean> {
    return this.checkIfUserExistsInBackend({ email: firebaseUser.email }).pipe(
      switchMap((val: any) => {
        if (val) {
          this.storeAuthDetails(firebaseUser);
          this.isAuthenticated.next(true);
          return of(true);
        } else {
          if (allowRegistration && confirm('Deseas registrarte')) {
            this.router.navigate(['auth/register']);
            return of(false);
          } else {
            return of(false);
          }
        }
      }),
      catchError(() => of(false))
    );
  }

  async loginWithCreds(user: User): Promise<any> {
    const body = {
      email: user.email || '',
      password: user.password,
    };

    let googleAuth;
    try {
      googleAuth = await this.afAuth.signInWithEmailAndPassword(
        body.email,
        body.password
      );
    } catch (err: any) {
      this.toastSvc.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Usuario no encontrado',
      });
      this.router.navigate(['auth/register']);
    }

    if (!googleAuth) {
      return;
    }
    return this.login(googleAuth.user, true, 'loginWithCreds');
  }

  async googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    let userCred;

    try {
      userCred = await this.afAuth.signInWithPopup(provider);
    } catch (err: any) {
      console.log('Error', err);
      return;
    }

    if (!userCred) {
      return;
    }

    return this.login(userCred.user, true, 'googleLogin');
  }

  async registerUserWithForm(user: any) {
    let response = {
      success: false,
      message: '',
      errors: [],
    };
    try {
      const googleAuth = await this.afAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      if (googleAuth && googleAuth.user) {
        googleAuth.user.updateProfile({
          displayName: `${user.first_name} ${user.last_name}`,
        });
      }
      return this.registerUserInBackend(user);
    } catch (err: any) {
      response.message = err.message;
      return of(response);
    }
  }

  registerUserInBackend(user: any) {
    this.userSvc.create(user).subscribe(
      (res) => {
        this.toastSvc.add({
          severity: 'success',
          summary: 'Usuario registrado',
          detail: `${res.user.email} registrado de manera exitosa`,
        });
        this.router.navigate(['']);
      },
      (err) => {
        this.toastSvc.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
      }
    );
  }

  storeAuthDetails(user: any) {
    this.user.next(user);
    let userData = JSON.stringify(user);
    localStorage.setItem('user', userData);
    user.getIdToken().then((tkn: any) => {
      localStorage.setItem('access', tkn);
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.clear();
      this.isAuthenticated.next(false);
      this.router.navigate(['auth/login']);
    });
  }

  passwordReset(body: any) {
    return this.afAuth.sendPasswordResetEmail(body.email);
  }
}
