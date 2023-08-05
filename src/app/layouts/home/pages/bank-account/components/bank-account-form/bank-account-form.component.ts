import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BankAccountService } from '@app/core/controllers/bank-account-controller.service';
import { ToastService } from '@app/core/services/toast.service';
import processFormControlErrors from '@app/core/utils/processFormControlErrors';
import { windowWhen } from 'rxjs';

@Component({
  selector: 'app-bank-account-form',
  templateUrl: './bank-account-form.component.html',
  styleUrls: ['./bank-account-form.component.scss'],
})
export class BankAccountFormComponent implements OnInit {
  processError = processFormControlErrors;

  editOn = true;

  label = 'Detalle';
  labelForNameControl = 'Nombre';
  labelForDescriptionControl = 'Descripción';
  labelForCurrencyControl = 'Saldo Inicial';

  form: FormGroup;
  nameControl: FormControl = new FormControl(null, [Validators.required]);
  descriptionControl: FormControl = new FormControl(null, [
    Validators.required,
  ]);
  currencyControl: FormControl = new FormControl(null, [Validators.required]);
  amountControl: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private bankSvc: BankAccountService,
    private fb: FormBuilder,
    private toastSvc: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.nameControl,
      description: this.descriptionControl,
      currency: this.currencyControl,
      amount: this.amountControl,
    });
  }
  onSaveClick() {
    let currency = this.currencyControl.value;
    if (currency) {
      currency = currency.value;
    }
    this.bankSvc
      .create({
        name: this.nameControl.value,
        description: this.descriptionControl.value,
        currency: currency,
        total: this.amountControl.value,
      })
      .subscribe(
        (res) => {
          this.toastSvc.add({
            severity: 'success',
            summary: 'Cuenta bancaria creada',
            detail: 'La cuenta bancaria se ha creado correctamente',
          });
          window.location.reload();
        },
        (err) => {
          err.error.errors.map((error: any) => {
            let fieldName = error.field;
            this.form.controls[fieldName].setErrors({
              serverError: error.message,
            });
            this.form.controls[fieldName].markAsDirty();
            this.form.controls[fieldName].markAsTouched();
          });
        }
      );
  }
}
