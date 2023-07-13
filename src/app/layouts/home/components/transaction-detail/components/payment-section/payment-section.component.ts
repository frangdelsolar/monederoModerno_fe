import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CurrencyService } from '@app/core/controllers/currency.controller';
import { TransactionService } from '@app/core/controllers/transaction.controller';
import { Transaction } from '@app/core/models/transaction.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment-section',
  templateUrl: './payment-section.component.html',
  styleUrls: ['./payment-section.component.scss'],
})
export class PaymentSectionComponent implements OnInit {
  @Input() transactionObservable: Observable<Transaction>;
  transaction: Transaction;

  editAmountSectionControl: FormControl = new FormControl(null, []);

  newAmountForm: FormGroup;
  newAmountControl: FormControl = new FormControl(null, []);
  newCurrencyControl: FormControl = new FormControl(null, []);
  newRateControl: FormControl = new FormControl(null, []);

  pendingPayment: boolean = false;

  constructor(
    private transactionSvc: TransactionService,
    private fb: FormBuilder,
    private currencySvc: CurrencyService
  ) {}

  ngOnInit(): void {
    this.newAmountForm = this.fb.group({
      newAmount: this.newAmountControl,
      newCurrency: this.newCurrencyControl,
      newRate: this.newRateControl,
    });

    this.transactionObservable.subscribe((transaction) => {
      this.transaction = transaction;
      if (this.transaction.payment != null) {
        this.pendingPayment = false;
      } else {
        this.pendingPayment = true;
      }
    });

    this.currencySvc.get().subscribe((rate: any) => {
      this.newRateControl.setValue(rate['venta']);
    });
  }

  payTransaction() {
    let data = {
      transaction_id: this.transaction.id,
      amount: this.transaction.currency.amount,
      currency: this.transaction.currency.currency,
      rate: this.newRateControl.value,
      due_date: this.transaction.due_date,
    };

    if (this.editAmountSectionControl.value) {
      data.amount = this.newAmountControl.value;
      data.currency = this.newCurrencyControl.value.value;
      data.rate = this.newRateControl.value;
    }
    this.transactionSvc.payTransaction(data).subscribe((res) => {
      window.location.reload();
    });
  }
}
