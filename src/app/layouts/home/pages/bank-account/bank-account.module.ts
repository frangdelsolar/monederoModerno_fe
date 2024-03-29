import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { BankAccountComponent } from './bank-account.component';
import { BankAccountListComponent } from './components/bank-account-list/bank-account-list.component';
import { BankAccountItemComponent } from './components/bank-account-item/bank-account-item.component';
import { BankAccountFormComponent } from './components/bank-account-form/bank-account-form.component';
import { PaymentsTableComponent } from './components/payments-table/payments-table.component';
import { BankAccountWidgetComponent } from './components/bank-account-widget/bank-account-widget.component';
import { BankAccountInstructionsComponent } from './components/bank-account-instructions/bank-account-instructions.component';
import { TransferFormComponent } from './components/transfer-form/transfer-form.component';

@NgModule({
  declarations: [
    BankAccountComponent,
    BankAccountListComponent,
    BankAccountItemComponent,
    BankAccountFormComponent,
    PaymentsTableComponent,
    BankAccountWidgetComponent,
    BankAccountInstructionsComponent,
    TransferFormComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [SharedModule, BankAccountWidgetComponent],
})
export class BankAccountModule {}
