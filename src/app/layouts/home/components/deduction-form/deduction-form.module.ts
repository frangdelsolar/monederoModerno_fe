import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { DeductionFormComponent } from './deduction-form.component';
import { FrequencyFormComponent } from './components/frequency-form/frequency-form.component';
import { GoalFormComponent } from './components/goal-form/goal-form.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { UIModule } from '@app/shared/UI/ui.module';

@NgModule({
  declarations: [
    DeductionFormComponent,
    FrequencyFormComponent,
    GoalFormComponent,
    TransactionFormComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [SharedModule, DeductionFormComponent],
})
export class DeductionFormModule {}
