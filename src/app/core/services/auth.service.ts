import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { initializeApp } from 'firebase/app';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../controllers/user.controller';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any = null;

  private isAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(public afAuth: AngularFireAuth, private userSvc: UserService) {
    initializeApp(environment.firebase);
    this.verifyAuthentication();
  }

  get isAuthenticatedObservable(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  verifyAuthentication() {
    let userDataString = localStorage.getItem('user');
    if (userDataString) {
      this.user = JSON.parse(userDataString);
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  async auth(user: User): Promise<any> {
    const body = {
      email: user.email || '',
      password: user.password,
    };

    try {
      const googleAuth = await this.afAuth.signInWithEmailAndPassword(
        body.email,
        body.password
      );
      this.storeAuthDetails(googleAuth.user);
      return true;
    } catch (err: any) {
      return err.message;
    }
  }

  storeAuthDetails(user: any) {
    localStorage.setItem('user', JSON.stringify(user));

    user.getIdToken().then((tkn: any) => {
      localStorage.setItem('access', tkn);
      this.isAuthenticated.next(true);
    });
  }

  async registerUser(user: any) {
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
      this.storeAuthDetails(googleAuth.user);
      return this.registerUserInBackend(user);
    } catch (err: any) {
      response.message = err.message;
      return of(response);
    }
  }

  registerUserInBackend(user: any) {
    const body = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };

    return this.userSvc.create(user);
  }

  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.clear();
      this.isAuthenticated.next(false);
    });
  }

  passwordReset(body: any) {
    return this.afAuth.sendPasswordResetEmail(body.email);
  }
}
