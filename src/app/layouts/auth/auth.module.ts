import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthComponent } from './auth.component';
import { SharedModule } from '@app/shared/shared.module';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { LogoutComponent } from './components/logout/logout.component';
@NgModule({
  declarations: [
    AuthComponent,
    LoginFormComponent,
    RegisterFormComponent,
    PasswordResetComponent,
    LogoutComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class AuthModule {}
