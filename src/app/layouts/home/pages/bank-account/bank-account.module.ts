import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { BankAccountComponent } from './bank-account.component';
import { BankAccountListComponent } from './components/bank-account-list/bank-account-list.component';
import { BankAccountItemComponent } from './components/bank-account-item/bank-account-item.component';
import { BankAccountFormComponent } from './components/bank-account-form/bank-account-form.component';

@NgModule({
  declarations: [BankAccountComponent, BankAccountListComponent, BankAccountItemComponent, BankAccountFormComponent],
  imports: [CommonModule, SharedModule],
  exports: [SharedModule],
})
export class BankAccountModule {}
