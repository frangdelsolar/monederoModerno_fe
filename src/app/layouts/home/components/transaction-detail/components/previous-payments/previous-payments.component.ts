import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TransactionService } from '@app/core/controllers/transaction.controller';
import { Payment } from '@app/core/models/payment.interface';
import { Transaction } from '@app/core/models/transaction.interface';
import { ToastService } from '@app/core/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-previous-payments',
  templateUrl: './previous-payments.component.html',
  styleUrls: ['./previous-payments.component.scss'],
})
export class PreviousPaymentsComponent implements OnInit {
  @Input() transactionObservable: Observable<Transaction>;
  transaction: Transaction;
  payments: Payment[] = [];

  total: any;

  showExchangeColumn: FormControl = new FormControl(false, []);

  percentage: number = 0;

  constructor(
    private transactionSvc: TransactionService,
    private toastSvc: ToastService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.transactionObservable.subscribe((transaction) => {
      this.transaction = transaction;
      this.payments = transaction.payments;

      this.total = transaction.total_paid?.amount.toLocaleString('es-AR', {
        style: 'currency',
        currency: transaction.total_paid?.currency,
        minimumFractionDigits: 2,
      });
    });
  }

  onRowDelete(id: any) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar este pago?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.transactionSvc.deletePayment(id).subscribe((res: any) => {
          this.toastSvc.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: res.message,
          });
          window.location.reload();
        });
      },
      reject: () => {},
    });
  }
}
