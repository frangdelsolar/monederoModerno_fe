import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TransactionWrapperComponent } from './components/transaction-wrapper/transaction-wrapper.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'transaccion/:id',
        component: TransactionWrapperComponent,
      },
      {
        path: '',
        component: TransactionsListComponent,
      },
      {
        path: 'transacciones',
        component: TransactionsComponent,
      },
      {
        path: 'billeteras',
        loadChildren: () =>
          import('./pages/bank-account/bank-account-routing.module').then(
            (m) => m.BankAccountRoutingModule
          ),
      },
      {
        path: 'presupuestos',
        loadChildren: () =>
          import('./pages/budget-goal/budget-goal-routing.module').then(
            (m) => m.BudgetGoalRoutingModule
          ),
      },
      {
        path: 'categorias',
        loadChildren: () =>
          import('./pages/category/category-routing.module').then(
            (m) => m.CategoryRoutingModule
          ),
      },
      {
        path: 'tareas',
        loadChildren: () =>
          import('./pages/task/task-routing.module').then(
            (m) => m.TaskRoutingModule
          ),
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
