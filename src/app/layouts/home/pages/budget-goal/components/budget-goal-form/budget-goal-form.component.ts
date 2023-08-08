import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BudgetGoalService } from '@app/core/controllers/budget-goal-controller.service';
import processFormControlErrors from '@app/core/utils/processFormControlErrors';

@Component({
  selector: 'app-budget-goal-form',
  templateUrl: './budget-goal-form.component.html',
  styleUrls: ['./budget-goal-form.component.scss'],
})
export class BudgetGoalFormComponent implements OnInit {
  processError = processFormControlErrors;

  editModeOn = true;
  goalType = [
    { value: 'PERCENTAGE', name: 'Porcentaje' },
    { value: 'AMOUNT', name: 'Monto' },
  ];

  form: FormGroup;
  effectiveFromControl: FormControl = new FormControl(null, [
    Validators.required,
  ]);
  effectiveToControl: FormControl = new FormControl(null, []);
  deductionTypeControl: FormControl = new FormControl(null, [
    Validators.required,
  ]);
  serviceControl: FormControl = new FormControl(null, [Validators.required]);
  goalTypeControl: FormControl = new FormControl(null, [Validators.required]);
  percentageControl: FormControl = new FormControl(null, []);
  amountControl: FormControl = new FormControl(null, []);
  currencyControl: FormControl = new FormControl(null, [Validators.required]);
  rateControl: FormControl = new FormControl(null, []);

  saveBtnLabel = 'Guardar';
  saveBtnAction = () => {};

  constructor(
    private fb: FormBuilder,
    private budgetGoalService: BudgetGoalService
  ) {
    this.form = this.fb.group({
      effective_from: this.effectiveFromControl,
      effective_to: this.effectiveToControl,
      goal_type: this.goalTypeControl,
      transaction_type: this.deductionTypeControl,
      service_category: this.serviceControl,
      percentage: this.percentageControl,
      amount: this.amountControl,
      currency: this.currencyControl,
      rate: this.rateControl,
    });
  }

  ngOnInit(): void {
    this.saveBtnAction = this.onSave;
  }

  onSave() {
    let data = this.form.value;
    data.goal_type = data.goal_type?.value;
    data.transaction_type = data.transaction_type?.value;
    data.currency = data.currency?.value;
    data.service_category = data.service_category?.id;
    this.budgetGoalService.create(data).subscribe(
      (res) => {
        window.location.reload();
      },
      (err) => {
        err.error.errors.forEach((error: any) => {
          let control = this.form.get(error.field);
          control?.setErrors({ serverError: error.message });
          control?.markAsDirty();
          control?.markAsTouched();
        });
      }
    );
  }
}
