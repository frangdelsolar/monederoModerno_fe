import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { SidebarService } from '@app/core/services/sidebar.service';
import { Subject } from 'rxjs';
import { ToolbarComponent } from './toolbar.component';

const mockSidebarSvc = {
  $display: new Subject<boolean>(),
};

const mockAuthSvc = {
  logout: () => {},
  isAuthenticatedObservable: new Subject<boolean>(),
};

const mockRouter = {
  navigate: () => {},
};

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let authSvc: AuthService;
  let sidebarSvc: SidebarService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthSvc },
        { provide: SidebarService, useValue: mockSidebarSvc },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    authSvc = TestBed.inject(AuthService);
    sidebarSvc = TestBed.inject(SidebarService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show login, hide menu and logout if user is not authenticated', () => {
    component.userIsAuth = false;
    fixture.detectChanges();

    const loginBtn = document.querySelector('#login-button');
    const logoutBtn = document.querySelector('#logout-button');
    const menuBtn = document.querySelector('#menu-button');

    expect(loginBtn).not.toBeNull();
    expect(logoutBtn).toBeNull();
    expect(menuBtn).toBeNull();
  });

  it('should show logout and menu, hide login if user is authenticated', () => {
    component.userIsAuth = true;
    fixture.detectChanges();

    const loginBtn = document.querySelector('#login-button');
    const logoutBtn = document.querySelector('#logout-button');
    const menuBtn = document.querySelector('#menu-button');

    expect(loginBtn).toBeNull();
    expect(logoutBtn).not.toBeNull();
    expect(menuBtn).not.toBeNull();
  });

  it('should hide menu is showMenuButton is false', () => {
    component.showMenuButton = false;
    fixture.detectChanges();

    const menuBtn = document.querySelector('#menu-button');

    expect(menuBtn).toBeNull();
  });

  it('should show menu is showMenuButton is true', () => {
    component.showMenuButton = true;
    fixture.detectChanges();

    const menuBtn = document.querySelector('#menu-button');

    expect(menuBtn).not.toBeNull();
  });

  it('should hide login and logout buttons if showAuthButtons is set to false', () => {
    component.showAuthButtons = false;
    component.userIsAuth = true;
    fixture.detectChanges();

    const loginBtn = document.querySelector('#login-button');
    const logoutBtn = document.querySelector('#logout-button');

    expect(loginBtn).toBeNull();
    expect(logoutBtn).toBeNull();
  });

  it('should show login and logout button if showAuthButtons is set to true', () => {
    component.showAuthButtons = true;
    component.userIsAuth = true;
    fixture.detectChanges();

    const loginBtn = document.querySelector('#login-button');
    const logoutBtn = document.querySelector('#logout-button');

    expect(loginBtn).toBeNull();
    expect(logoutBtn).not.toBeNull();
  });

  it('should toggle sidebar on menu click', () => {
    spyOn(sidebarSvc.$display, 'next');
    component.onMenuClick();
    expect(sidebarSvc.$display.next).toHaveBeenCalled();
  });

  it('should logout on logout click and redirect to /login', () => {
    spyOn(authSvc, 'logout');
    spyOn(router, 'navigate');

    component.onSignOutClick();
    expect(authSvc.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['auth/login']);
  });

  it('should redirect to /login if login is clicked', () => {
    spyOn(router, 'navigate');
    component.onSignInClick();

    expect(router.navigate).toHaveBeenCalledWith(['auth/login']);
  });
});
