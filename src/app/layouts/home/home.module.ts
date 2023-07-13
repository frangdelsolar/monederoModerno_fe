import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DeductionFormComponent } from './components/deduction-form/deduction-form.component';
import { ServiceDropdownComponent } from './components/service-dropdown/service-dropdown.component';
import { DeductionTypeDropdownComponent } from './components/deduction-type-dropdown/deduction-type-dropdown.component';
import { FrequencyFormComponent } from './components/frequency-form/frequency-form.component';
import { GoalFormComponent } from './components/goal-form/goal-form.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { ServiceProviderDropdownComponent } from './components/service-provider-dropdown/service-provider-dropdown.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { TransactionDetailModule } from './components/transaction-detail/transaction-detail.module';

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    DeductionFormComponent,
    ServiceDropdownComponent,
    DeductionTypeDropdownComponent,
    FrequencyFormComponent,
    GoalFormComponent,
    TransactionFormComponent,
    ServiceProviderDropdownComponent,
    TransactionsListComponent,
    TransactionItemComponent,
  ],
  imports: [CommonModule, SharedModule, TransactionDetailModule],
  exports: [SharedModule],
})
export class HomeModule {}
