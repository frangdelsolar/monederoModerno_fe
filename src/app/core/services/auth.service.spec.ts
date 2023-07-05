import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { PrivateApiService } from './private-api.service';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let privateApiServiceSpy: jasmine.SpyObj<PrivateApiService>;
  let afAuthSpy: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(() => {
    const privateApiServiceSpyObj = jasmine.createSpyObj('PrivateApiService', [
      '',
    ]);
    const afAuthSpyObj = jasmine.createSpyObj('AngularFireAuth', [
      'signInWithEmailAndPassword',
      'signOut',
      'sendPasswordResetEmail',
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: PrivateApiService, useValue: privateApiServiceSpyObj },
        { provide: AngularFireAuth, useValue: afAuthSpyObj },
      ],
    });

    authService = TestBed.inject(AuthService);
    privateApiServiceSpy = TestBed.inject(
      PrivateApiService
    ) as jasmine.SpyObj<PrivateApiService>;
    afAuthSpy = TestBed.inject(
      AngularFireAuth
    ) as jasmine.SpyObj<AngularFireAuth>;
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  //   it('should initialize firebase app with the environment configuration', () => {
  //     expect(initializeApp).toHaveBeenCalledWith(environment.firebase);
  //   });

  it('should initialize the authentication state based on the stored user data', () => {
    const storedUser = {
      email: 'test@example.com',
      password: 'password123',
    };
    localStorage.setItem('user', JSON.stringify(storedUser));

    authService.isAuth();

    expect(authService['user']).toEqual(storedUser);
    expect(authService['isAuthenticated'].value).toBeTrue();
  });

  //   it('should set the authentication state to false if there is no stored user data', () => {
  //     localStorage.removeItem('user');

  //     authService.isAuth();

  //     expect(authService['user']).toBeNull();
  //     expect(authService['isAuthenticated'].value).toBeFalse();
  //   });

  it('should store the user data in local storage', () => {
    const userData = { email: 'test@example.com', name: 'John Doe' };

    authService.storeUser(userData);

    expect(localStorage.getItem('user')).toEqual(JSON.stringify(userData));
  });

  //   it('should set the authentication state to true and store the access token in local storage when logging in', () => {
  //     const user = { getIdToken: () => Promise.resolve('test-access-token') };
  //     authService.storeUser = jasmine.createSpy('storeUser');

  //     authService.login(user);

  //     expect(authService.storeUser).toHaveBeenCalledWith(user);
  //     expect(authService['isAuthenticated'].value).toBeTrue();
  //     expect(localStorage.getItem('access')).toBe('test-access-token');
  //   });

  //   it('should sign out the user, set the authentication state to false, and clear local storage on logout', () => {
  //     authService.logout();

  //     expect(afAuthSpy.signOut).toHaveBeenCalled();
  //     expect(authService['isAuthenticated'].value).toBeFalse();
  //     expect(localStorage.clear).toHaveBeenCalled();
  //   });

  it('should send a password reset email using AngularFireAuth', () => {
    const email = 'test@example.com';
    afAuthSpy.sendPasswordResetEmail.and.returnValue(Promise.resolve());

    authService.passwordReset({ email });

    expect(afAuthSpy.sendPasswordResetEmail).toHaveBeenCalledWith(email);
  });
});
