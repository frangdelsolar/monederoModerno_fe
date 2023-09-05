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

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
})
export class TransferFormComponent implements OnInit {
  bankAccount: BankAccount;

  form: FormGroup;
  destinationControl: FormControl = new FormControl(null, [
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
      destination: this.destinationControl,
      currency: this.currencyControl,
      amount: this.amountControl,
    });
    this.saveBtnAction = this.onSaveClick;
  }

  ngOnInit(): void {
    this.dialogSvc.DialogDataObservable.subscribe((data) => {
      if (data.data.item) {
        let item = data.data.item;
        this.bankAccount = item;
      }
    });
  }

  onSaveClick() {
    let currency = this.currencyControl.value;
    if (currency) {
      currency = currency.value;
    }
    let destination = this.destinationControl.value;
    if (destination) {
      destination = destination.id;
    }
    this.bankSvc
      .transfer(this.bankAccount.id, {
        currency: currency,
        amount: this.amountControl.value,
        destination: destination,
      })
      .subscribe(
        (res) => {
          this.toastSvc.add({
            severity: 'success',
            summary: 'Transferencia realizada',
            detail: 'La transferencia se ha producido correctamente',
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
