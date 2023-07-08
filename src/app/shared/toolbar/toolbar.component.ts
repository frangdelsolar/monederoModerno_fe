import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  userIsAuth: boolean = true;

  @Input() showMenuButton: boolean = true;
  @Input() showAuthButtons: boolean = true;

  constructor(
    private sidebarSvc: SidebarService,
    private authSvc: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSvc.isAuthenticatedObservable.subscribe((isAuth) => {
      this.userIsAuth = isAuth;
    });
  }

  onLogoClick() {
    this.router.navigate(['']);
  }

  onMenuClick() {
    this.sidebarSvc.$display.next(true);
  }

  onSignOutClick() {
    this.authSvc.logout();
    this.router.navigate(['auth/login']);
  }

  onSignInClick() {
    this.router.navigate(['auth/login']);
  }
}
