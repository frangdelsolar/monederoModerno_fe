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

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    TransactionsListComponent,
    TransactionItemComponent,
    TotalsDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransactionDetailModule,
    DeductionFormModule,
  ],
  exports: [SharedModule],
})
export class HomeModule {}
