import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { TransactionDetailModule } from './components/transaction-detail/transaction-detail.module';
import { DeductionFormModule } from './components/deduction-form/deduction-form.module';
import { TotalsDetailsComponent } from './components/transactions-list/components/totals-details/totals-details.component';
import { TransactionWrapperComponent } from './components/transaction-wrapper/transaction-wrapper.component';
import { BankAccountModule } from './pages/bank-account/bank-account.module';
import { BudgetGoalModule } from './pages/budget-goal/budget-goal.module';
import { MonthSelectorComponent } from './components/month-selector/month-selector.component';
import { CategoryModule } from './pages/category/category.module';

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    TransactionsListComponent,
    TransactionItemComponent,
    TotalsDetailsComponent,
    TransactionWrapperComponent,
    MonthSelectorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransactionDetailModule,
    DeductionFormModule,
    BankAccountModule,
    BudgetGoalModule,
    CategoryModule,
  ],
  exports: [SharedModule],
})
export class HomeModule {}
