import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TransactionService } from '@app/core/controllers/transaction.controller';
import { Transaction } from '@app/core/models/transaction.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent implements OnInit, OnDestroy {
  @Input() transactionId: number;
  @Input() month: string;
  @Input() year: string;
  @Input() calledDirectly: boolean = false;

  loading: boolean = true;

  transaction: Transaction;
  $transaction: BehaviorSubject<any> = new BehaviorSubject(null);

  dialogDataSubscription: Subscription;

  pendingPayment: boolean = false;
  showHistoricalPaymentsControl: FormControl = new FormControl(false, []);

  constructor(
    private dialogSvc: AppDialogService,
    private transactionSvc: TransactionService
  ) {}

  ngOnInit(): void {
    if (this.calledDirectly) {
      this.loadData(this.transactionId, this.month, this.year);
    } else {
      this.dialogDataSubscription =
        this.dialogSvc.DialogDataObservable.subscribe((data) => {
          if (data) {
            this.loadData(
              data.data.transactionId,
              data.data.month,
              data.data.year
            );
          }
        });
    }
  }

  loadData(id: number, month: any, year: any) {
    this.loading = true;
    this.transactionId = id;
    this.month = month;
    this.year = year;
    this.transactionSvc
      .getById(this.transactionId.toString(), this.month, this.year)
      .subscribe((transaction: Transaction) => {
        this.transaction = transaction;
        this.$transaction.next(transaction);

        let current_installment = this.transaction.payments.filter(
          (payment: any) => {
            return payment.due_date == transaction.due_date;
          }
        );
        if (current_installment.length > 0) {
          current_installment = current_installment[0];
          this.pendingPayment = false;
        } else {
          this.pendingPayment = true;
        }
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    if (this.dialogDataSubscription) {
      this.dialogDataSubscription.unsubscribe();
    }
  }
}
