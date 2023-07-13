import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CurrencyService } from '@app/core/controllers/currency.controller';
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

  transaction: Transaction;
  $transaction: BehaviorSubject<any> = new BehaviorSubject(null);

  dialogDataSubscription: Subscription;

  pendingPayment: boolean = true;

  constructor(
    private dialogSvc: AppDialogService,
    private transactionSvc: TransactionService
  ) {}

  ngOnInit(): void {
    this.dialogDataSubscription = this.dialogSvc.DialogDataObservable.subscribe(
      (data) => {
        if (data) {
          this.transactionId = data.data.transactionId;
          this.month = data.data.month;
          this.year = data.data.year;
          this.transactionSvc
            .getById(this.transactionId.toString(), this.month, this.year)
            .subscribe((transaction: Transaction) => {
              this.transaction = transaction;
              this.$transaction.next(transaction);
              if (this.transaction.payment != null) {
                this.pendingPayment = false;
              }
            });
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.dialogDataSubscription) {
      this.dialogDataSubscription.unsubscribe();
    }
  }
}
