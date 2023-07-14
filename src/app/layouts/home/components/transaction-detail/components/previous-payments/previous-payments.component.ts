import { Component, Input, OnInit } from '@angular/core';
import { Payment } from '@app/core/models/payment.interface';
import { Transaction } from '@app/core/models/transaction.interface';
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

  constructor() {}

  ngOnInit(): void {
    this.transactionObservable.subscribe((transaction) => {
      this.transaction = transaction;
      this.payments = transaction.payments;
    });
  }
}
