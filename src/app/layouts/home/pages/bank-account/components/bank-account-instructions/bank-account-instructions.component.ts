import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BankAccountService } from '@app/core/controllers/bank-account-controller.service';
import { TransactionService } from '@app/core/controllers/transaction.controller';
import { BankAccount } from '@app/core/models/bank-account.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-bank-account-instructions',
  templateUrl: './bank-account-instructions.component.html',
  styleUrls: ['./bank-account-instructions.component.scss'],
})
export class BankAccountInstructionsComponent implements OnInit {
  bankAccount: BankAccount;
  instructionsControl: FormControl = new FormControl(null, []);
  editModeOnControl: FormControl = new FormControl(false, []);

  constructor(
    private accountSvc: BankAccountService,
    private toastSvc: ToastService,
    private confirmationService: ConfirmationService,
    private dialogSvc: AppDialogService
  ) {}

  ngOnInit(): void {
    this.dialogSvc.DialogDataObservable.subscribe((data) => {
      if (data.data.item) {
        this.bankAccount = data.data.item;
        this.loadInstructions();
      }
    });
  }

  loadInstructions() {
    this.accountSvc
      .getInstructions(this.bankAccount.id)
      .subscribe((res: any) => {
        this.instructionsControl.setValue(res.instructions);
        console.log(this.instructionsControl.value);
      });
  }

  saveBtnAction() {
    this.accountSvc
      .postInstructions(this.bankAccount.id, {
        instructions: this.instructionsControl.value,
      })
      .subscribe((res: any) => {
        this.toastSvc.add({
          severity: 'success',
          summary: 'Instrucciones actualizadas',
          detail: 'Las instrucciones se han actualizado correctamente',
        });
        window.location.reload();
      });
  }
}
