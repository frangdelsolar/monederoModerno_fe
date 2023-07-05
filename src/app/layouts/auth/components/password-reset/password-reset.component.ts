import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '@app/core/services/toast.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  form!: FormGroup;
  email = new FormControl('', []);
  username = new FormControl('', []);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: ToastService,
    private authSvc: AuthService
  ) {
    this.form = fb.group({
      email: this.email,
      username: this.username,
    });
  }

  ngOnInit(): void {}

  validateForm() {
    let valid = this.email.value != '' || this.username.value != '';

    if (!valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Algo anda mal',
        detail: 'Parece que falta completar algo.',
      });
      valid = false;
    }

    return valid;
  }

  onSubmitClick() {
    if (this.validateForm()) {
      this.messageService.add({
        severity: 'info',
        summary: 'Operación en curso',
        detail: 'Hemos recibido tu petición',
      });
      this.authSvc.passwordReset(this.form.value).then(
        (success) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail:
              'Por favor revisa tu casilla de correo. REVISA LA CARPETA DE CORREO NO DESEADO!!',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Algo anda mal',
            detail: error.message,
          });
        }
      );
    }
  }
}
