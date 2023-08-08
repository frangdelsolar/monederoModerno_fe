import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TransactionService } from '@app/core/controllers/transaction.controller';
import { BankAccount } from '@app/core/models/bank-account.interface';
import { Payment } from '@app/core/models/payment.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss'],
})
export class PaymentsTableComponent implements OnInit {
  bankAccount: BankAccount;
  payments: Payment[] = [];

  total: any;

  showExchangeColumn: FormControl = new FormControl(false, []);
  showActionColumn: FormControl = new FormControl(false, []);

  percentage: number = 0;

  constructor(
    private transactionSvc: TransactionService,
    private toastSvc: ToastService,
    private confirmationService: ConfirmationService,
    private dialogSvc: AppDialogService
  ) {}

  ngOnInit(): void {
    this.dialogSvc.DialogDataObservable.subscribe((data) => {
      if (data.data.item) {
        this.bankAccount = data.data.item;
        this.loadPayments();
      }
    });
  }

  loadPayments() {
    let params = {
      account_id: this.bankAccount.id,
    };
    this.transactionSvc.getPayments(params).subscribe((res: Payment[]) => {
      this.payments = res;
    });
  }
}
