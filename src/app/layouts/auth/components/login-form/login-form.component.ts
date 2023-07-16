import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceService } from '@app/core/services/device.service';
import { ToastService } from '@app/core/services/toast.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  showGoogleLoginButton: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private toastSvc: ToastService,
    private deviceSvc: DeviceService
  ) {
    this.form = fb.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {
    this.deviceSvc.getDeviceInfo().then((res) => {
      if (res.platform == 'web') {
        this.showGoogleLoginButton = true;
      }
    });
  }

  onLogin() {
    if (this.form.valid) {
      this.authSvc.auth(this.form.value).then((res: any) => {
        if (res == true) {
          window.location.href = '/';
        } else {
          this.toastSvc.add({
            severity: 'error',
            summary: 'Inicio de sesión fallido',
            detail: res,
          });
        }
      });
    }
  }

  onGoogleLogin() {
    this.authSvc.googleLogin().then((res: any) => {
      if (res) {
        window.location.href = '/';
      } else {
        this.toastSvc.add({
          severity: 'error',
          summary: 'Inicio de sesión fallido',
          detail: res,
        });
      }
    });
  }
}
