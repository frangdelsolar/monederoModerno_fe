import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  total: string;

  showExchangeColumn: FormControl = new FormControl(false, []);
  showTotal: FormControl = new FormControl(false, []);

  percentage: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.transactionObservable.subscribe((transaction) => {
      this.transaction = transaction;
      this.payments = transaction.payments;
      this.total = `${
        transaction.total_paid?.currency
      } $${transaction.total_paid?.amount.toLocaleString()}`;
    });
  }
}
