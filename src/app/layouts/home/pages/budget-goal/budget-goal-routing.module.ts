import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BudgetGoalComponent } from './budget-goal.component';
import { BudgetGoalListComponent } from './components/budget-goal-list/budget-goal-list.component';

const routes: Routes = [
  {
    path: '',
    component: BudgetGoalComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BudgetGoalListComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [],
})
export class BudgetGoalRoutingModule {}
