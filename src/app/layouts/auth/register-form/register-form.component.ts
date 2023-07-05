import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  form!: FormGroup;
  firstName = new FormControl('', []);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  passwordConfirm = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private toastSvc: ToastService
  ) {
    this.form = fb.group({
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password: this.password,
    });

    this.passwordConfirm.valueChanges.subscribe((value) => {
      setTimeout(() => {
        if (value !== this.password.value) {
          this.passwordConfirm.setErrors({
            serverError: 'Contraseñas no coinciden',
          });
        } else {
          this.passwordConfirm.setErrors(null);
        }
      }, 1000);
    });
  }

  ngOnInit(): void {}

  async onRegister() {
    if (this.form.valid) {
      this.authSvc.registerUser(this.form.value).then((res: any) => {
        console.log(res);
        res.subscribe(
          (res: any) => {
            console.log(res);
            if (res.success == 'ok') {
              this.toastSvc.add({
                severity: 'success',
                summary: 'Registro exitoso',
                detail: 'Redirigiendo...',
              });
              this.router.navigate(['/auth/login']);
            } else {
              this.toastSvc.add({
                severity: 'error',
                summary: 'Error',
                detail: res.message,
              });
            }
          },
          (err: any) => {
            err.error.errors.forEach((element: any) => {
              const fieldName = element.field;
              this.form.controls[fieldName].setErrors({
                serverError: element.message,
              });
              this.form.controls[fieldName].markAsDirty();
            });
          }
        );
      });
    }
  }
}
