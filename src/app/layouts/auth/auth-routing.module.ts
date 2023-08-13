import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { NoAuthGuard } from '@app/core/guards/no-auth.guard';
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        canActivate: [NoAuthGuard],
        component: LoginFormComponent,
      },
      {
        path: 'register',
        canActivate: [NoAuthGuard],
        component: RegisterFormComponent,
      },
      {
        path: 'reset-password',
        canActivate: [NoAuthGuard],
        component: PasswordResetComponent,
      },
      {
        path: 'logout',
        canActivate: [AuthGuard],
        component: LogoutComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [],
})
export class AuthRoutingModule {}
