import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { initializeApp } from 'firebase/app';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../controllers/user.controller';
import firebase from 'firebase/compat/app';
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
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

  checkFirebaseAuthStatus() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.storeAuthDetails(user);
      } else {
        this.logout();
      }
    });
  }

  verifyAuthentication() {
    let userDataString = localStorage.getItem('user');
    if (userDataString) {
      this.user = JSON.parse(userDataString);
      this.isAuthenticated.next(true);
      this.checkFirebaseAuthStatus();
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
      if (googleAuth && googleAuth.user) {
        googleAuth.user.updateProfile({
          displayName: `${user.first_name} ${user.last_name}`,
        });
        this.storeAuthDetails(googleAuth.user);
      }

      return this.registerUserInBackend(user);
    } catch (err: any) {
      response.message = err.message;
      return of(response);
    }
  }

  async googleLogin() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCred = await this.afAuth.signInWithPopup(provider);
      this.storeAuthDetails(userCred.user);

      if (userCred.additionalUserInfo?.isNewUser) {
        this.registerUserInBackend({
          first_name: userCred.user?.displayName?.split(' ')[0],
          last_name: userCred.user?.displayName?.split(' ')[1],
          email: userCred.user?.email,
        });
      }
      return true;
    } catch (err: any) {
      return err;
    }
  }

  registerUserInBackend(user: any) {
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
