import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { PaymentSectionComponent } from './components/payment-section/payment-section.component';
import { TransactionSectionComponent } from './components/transaction-section/transaction-section.component';
import { TransactionDetailComponent } from './transaction-detail.component';
import { InstallmentSectionComponent } from './components/installment-section/installment-section.component';
import { PreviousPaymentsComponent } from './components/previous-payments/previous-payments.component';

@NgModule({
  declarations: [
    PaymentSectionComponent,
    TransactionSectionComponent,
    TransactionDetailComponent,
    InstallmentSectionComponent,
    PreviousPaymentsComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [SharedModule],
})
export class TransactionDetailModule {}
