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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: ToastService,
    private authSvc: AuthService
  ) {
    this.form = fb.group({
      email: this.email,
    });
  }

  ngOnInit(): void {}

  onSubmitClick() {
    this.authSvc.passwordReset(this.form.value).then(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Revisa tu correo',
          detail:
            'Te enviamos un correo para que puedas cambiar tu contraseña.',
        });
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Algo anda mal',
          detail: 'Parece que falta completar algo.',
        });
      }
    );
  }
}
