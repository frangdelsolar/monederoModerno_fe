import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CurrencyService } from '@app/core/controllers/currency.controller';
import { TransactionService } from '@app/core/controllers/transaction.controller';
import { Transaction } from '@app/core/models/transaction.interface';
import { Observable } from 'rxjs';

interface PayFormData {
  transaction_id: number;
  amount: number;
  currency: string;
  rate: number;
  due_date: Date;
  update_amount: boolean;
}

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
  newAmountControl: FormControl = new FormControl<number | null>(null, []);
  newCurrencyControl: FormControl = new FormControl(null, []);
  newRateControl: FormControl = new FormControl(null, []);
  updateAmountControl: FormControl = new FormControl(false, []);
  dueDateControl: FormControl = new FormControl(new Date(), []);

  pendingPayment: boolean = false;
  loading: boolean = false;

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
      updateAmount: this.updateAmountControl,
    });

    this.transactionObservable.subscribe((transaction: Transaction) => {
      this.transaction = transaction;
      if (this.transaction.payment != null) {
        this.pendingPayment = false;
      } else {
        this.pendingPayment = true;
      }
      if (this.transaction.due_date) {
        this.dueDateControl.setValue(new Date(this.transaction.due_date));
        this.getExchangeRate();
      }
    });

    this.editAmountSectionControl.valueChanges.subscribe((value) => {
      if (!value) {
        this.updateAmountControl.setValue(false);
        this.newAmountControl.setValue(null);
        this.newCurrencyControl.setValue(null);
      }
    });
  }

  getExchangeRate() {
    this.loading = true;
    this.currencySvc
      .get(this.dueDateControl.value.toISOString().split('T')[0])
      .subscribe((rate: any) => {
        this.newRateControl.setValue(rate['blue']['venta']);
        this.loading = false;
      });
  }

  payTransaction() {
    if (!this.transaction.id || !this.transaction.due_date) {
      return;
    }
    let data: PayFormData = {
      transaction_id: this.transaction.id,
      amount: this.transaction.currency.amount,
      currency: this.transaction.currency.currency,
      rate: this.newRateControl.value,
      due_date: this.transaction.due_date,
      update_amount: false,
    };

    if (this.editAmountSectionControl.value) {
      data.amount = parseFloat(this.newAmountControl.value);
      data.currency = this.newCurrencyControl.value.value;
      data.rate = this.newRateControl.value;
      data.update_amount = this.updateAmountControl.value;
    }

    this.transactionSvc.payTransaction(data).subscribe((res) => {
      window.location.reload();
    });
  }
}
