import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BankAccountService } from '@app/core/controllers/bank-account-controller.service';
import { BankAccount } from '@app/core/models/bank-account.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import processFormControlErrors from '@app/core/utils/processFormControlErrors';

@Component({
  selector: 'app-bank-account-form',
  templateUrl: './bank-account-form.component.html',
  styleUrls: ['./bank-account-form.component.scss'],
})
export class BankAccountFormComponent implements OnInit {
  processError = processFormControlErrors;

  editModeOn = false;
  adjustModeOn = false;
  bankAccount: BankAccount;

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

  saveBtnLabel = 'Guardar';
  saveBtnAction = () => {};

  constructor(
    private bankSvc: BankAccountService,
    private fb: FormBuilder,
    private toastSvc: ToastService,
    private dialogSvc: AppDialogService
  ) {
    this.form = this.fb.group({
      name: this.nameControl,
      description: this.descriptionControl,
      currency: this.currencyControl,
      amount: this.amountControl,
    });
    this.saveBtnAction = this.onSaveClick;
  }

  ngOnInit(): void {
    this.dialogSvc.DialogDataObservable.subscribe((data) => {
      if (data.data.item) {
        let item = data.data.item;

        this.editModeOn = true;
        this.bankAccount = item;
        this.saveBtnAction = this.onUpdateClick;
        this.saveBtnLabel = 'Actualizar';

        if (item) {
          this.nameControl.setValue(item.name);
          this.descriptionControl.setValue(item.description);
          this.currencyControl.setValue(item.total.currency);
          this.amountControl.setValue(item.total.amount);
        }
      }
      if (data.data.adjust) {
        this.adjustModeOn = true;
        this.labelForCurrencyControl = 'Nuevo saldo';
        this.saveBtnAction = this.onAdjustClick;
        this.saveBtnLabel = 'Ajustar';
      }
    });
  }

  onAdjustClick() {
    if (!this.bankAccount) return;
    this.bankSvc
      .updateAccountTotal(this.bankAccount.id, {
        amount: this.amountControl.value,
      })
      .subscribe(
        (res) => {
          this.toastSvc.add({
            severity: 'success',
            summary: 'Cuenta bancaria actualizada',
            detail: 'La cuenta bancaria se ha actualizado correctamente',
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

  onUpdateClick() {
    if (!this.bankAccount) return;
    this.bankSvc
      .update(this.bankAccount.id, {
        name: this.nameControl.value,
        description: this.descriptionControl.value,
      })
      .subscribe(
        (res) => {
          this.toastSvc.add({
            severity: 'success',
            summary: 'Cuenta bancaria actualizada',
            detail: 'La cuenta bancaria se ha actualizado correctamente',
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
