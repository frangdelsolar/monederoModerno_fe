import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetGoalComponent } from './budget-goal.component';
import { BudgetGoalListComponent } from './components/budget-goal-list/budget-goal-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { BudgetGoalItemComponent } from './components/budget-goal-item/budget-goal-item.component';
import { BudgetGoalFormComponent } from './components/budget-goal-form/budget-goal-form.component';
import { BudgetGoalWidgetComponent } from './components/budget-goal-widget/budget-goal-widget.component';
import { BudgetGoalWidgetItemComponent } from './components/budget-goal-widget-item/budget-goal-widget-item.component';

@NgModule({
  declarations: [
    BudgetGoalComponent,
    BudgetGoalListComponent,
    BudgetGoalItemComponent,
    BudgetGoalFormComponent,
    BudgetGoalWidgetComponent,
    BudgetGoalWidgetItemComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [SharedModule, BudgetGoalWidgetComponent],
})
export class BudgetGoalModule {}
