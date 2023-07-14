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
  installmentControl: FormControl = new FormControl(null, []);

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

      if (this.transaction.payments) {
        let current_installment = this.transaction.payments.filter(
          (payment: any) => {
            return payment.due_date == transaction.due_date;
          }
        );
        if (current_installment.length > 0) {
          current_installment = current_installment[0];
          this.pendingPayment = false;
          this.statusControl.setValue('Ejecutado');
          this.paymentDateControl.setValue(
            current_installment.transaction_date
          );
          let payment_value =
            current_installment.currency.currency +
            ' $' +
            current_installment.currency.amount;
          this.paymentControl.setValue(payment_value);
        }
      }

      this.installmentControl.setValue(this.transaction.installment_number);
    });
  }
}
