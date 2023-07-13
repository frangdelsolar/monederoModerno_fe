import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Transaction } from '@app/core/models/transaction.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-installment-section',
  templateUrl: './installment-section.component.html',
  styleUrls: ['./installment-section.component.scss'],
})
export class InstallmentSectionComponent implements OnInit {
  @Input() transactionObservable: Observable<Transaction>;
  transaction: Transaction;

  dueDateLabel = 'Vencimiento';
  amountLabel = 'Valor de la cuota';

  dueDateControl: FormControl = new FormControl(null, []);
  amountControl: FormControl = new FormControl(null, []);
  statusControl: FormControl = new FormControl(null, []);
  paymentControl: FormControl = new FormControl(null, []);
  paymentDateControl: FormControl = new FormControl(null, []);

  pendingPayment: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.transactionObservable.subscribe((transaction) => {
      this.transaction = transaction;

      let amount_value =
        this.transaction.currency.currency +
        ' $' +
        this.transaction.currency.amount;
      this.amountControl.setValue(amount_value);

      this.dueDateControl.setValue(this.transaction.due_date);

      this.statusControl.setValue('Pendiente');
      if (this.transaction.payment != null) {
        this.pendingPayment = false;
        this.statusControl.setValue('Ejecutado');
        this.paymentDateControl.setValue(
          this.transaction.payment.transaction_date
        );
        let payment_value =
          this.transaction.payment.currency.currency +
          ' $' +
          this.transaction.payment.currency.amount;
        this.paymentControl.setValue(payment_value);
      }
    });
  }
}
