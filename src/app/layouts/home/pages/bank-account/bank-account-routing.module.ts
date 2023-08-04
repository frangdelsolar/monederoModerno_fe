import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BankAccountComponent } from './bank-account.component';
import { BankAccountListComponent } from './components/bank-account-list/bank-account-list.component';

const routes: Routes = [
  {
    path: '',
    component: BankAccountComponent,

    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BankAccountListComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [],
})
export class BankAccountRoutingModule {}
