import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TransactionWrapperComponent } from './components/transaction-wrapper/transaction-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'transaccion/:id',
        pathMatch: 'full',
        component: TransactionWrapperComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: TransactionsListComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [],
})
export class HomeRoutingModule {}
