import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-password-new',
  templateUrl: './password-new.component.html',
  styleUrls: ['./password-new.component.scss'],
})
export class PasswordNewComponent implements OnInit {
  token!: any;

  form!: FormGroup;
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  password_confirmation = new FormControl('', [Validators.required]);

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private authSvc: AuthService
  ) {
    this.form = fb.group({
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation,
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.token = params.get('token');
    });
  }

  validateForm() {
    if (!this.form.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Algo anda mal',
        detail: 'Parece que falta completar algo.',
      });
      return false;
    }

    if (
      this.form.controls['password'].value !=
      this.form.controls['password_confirmation'].value
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Algo anda mal',
        detail: 'Las contraseñas no coinciden.',
      });
      this.form.controls['email'].markAsDirty();
      this.form.controls['email_confirmation'].markAsDirty();
      return false;
    }

    let regex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,}).'
    );
    if (!regex.test(this.form.controls['password'].value)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Algo anda mal',
        detail: 'La contraseña es muy débil.',
      });
      return false;
    }

    return true;
  }

  onSubmitClick() {
    if (this.validateForm()) {
      this.messageService.add({
        severity: 'info',
        summary: 'Operación en curso',
        detail: 'Hemos recibido tu petición',
      });
      let data = {
        token: this.token,
        password: this.password.value,
      };
      let params = 'confirm/';
      this.authSvc.passwordReset(data);
    }
  }
}
