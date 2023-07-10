import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import FREQUENCIES from '@app/core/enums/frequency.enum';
import { GOAL_TYPES } from '@app/core/enums/goal_type.enum';
import { DeductionFormService } from '@app/core/services/deduction-form.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.scss'],
})
export class GoalFormComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Label';

  goalTypeControl: FormControl = new FormControl(null, []);
  goalType = [
    {
      value: 'NOGOAL',
      name: GOAL_TYPES.NOGOAL,
    },
    {
      value: 'REPETITIONS',
      name: GOAL_TYPES.REPETITIONS,
    },
    {
      value: 'AMOUNT',
      name: GOAL_TYPES.AMOUNT,
    },
    {
      value: 'CALENDAR',
      name: GOAL_TYPES.CALENDAR,
    },
  ];

  showRepetitionsControl: boolean = false;
  repetitionsControl: FormControl = new FormControl(null, []);
  showDateControl: boolean = false;
  dateControl: FormControl = new FormControl(null, []);
  showAmountControl: boolean = false;
  currencyControl: FormControl = new FormControl(null, []);
  amountControl: FormControl = new FormControl(null, []);
  rateControl: FormControl = new FormControl(null, []);

  validateCurrencySignal: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private deductionFormService: DeductionFormService) {}

  ngOnInit(): void {
    this.deductionFormService.SaveGoalSignal.subscribe((value) => {
      if (value) {
        this.validateAndSave();
      }
    });

    this.goalTypeControl.valueChanges.subscribe((value) => {
      if (value.name == GOAL_TYPES.REPETITIONS) {
        this.showRepetitionsControl = true;
        this.showDateControl = false;
        this.showAmountControl = false;
        this.dateControl.setValue(null);
        this.amountControl.setValue(null);
        this.currencyControl.setValue(null);
        this.rateControl.setValue(null);
      } else if (value.name == GOAL_TYPES.CALENDAR) {
        this.showRepetitionsControl = false;
        this.showDateControl = true;
        this.showAmountControl = false;
        this.repetitionsControl.setValue(null);
        this.amountControl.setValue(null);
        this.currencyControl.setValue(null);
        this.rateControl.setValue(null);
      } else if (value.name == GOAL_TYPES.AMOUNT) {
        this.showRepetitionsControl = false;
        this.showDateControl = false;
        this.showAmountControl = true;
        this.repetitionsControl.setValue(null);
        this.dateControl.setValue(null);
      } else {
        this.showRepetitionsControl = false;
        this.showDateControl = false;
        this.showAmountControl = false;
        this.repetitionsControl.setValue(null);
        this.dateControl.setValue(null);
        this.amountControl.setValue(null);
        this.currencyControl.setValue(null);
        this.rateControl.setValue(null);
      }
    });
  }

  onCurrencyErrors(errors: any) {
    errors.forEach((error: any) => {
      this.deductionFormService.pushError({
        step: error.step,
        error: error.error,
      });
    });
  }

  validateAndSave() {
    if (this.goalTypeControl.value == null) {
      let errorMsg = 'Debes seleccionar un tipo de meta';
      this.goalTypeControl.markAsDirty();
      this.goalTypeControl.markAsTouched();
      this.goalTypeControl.setErrors({
        serverError: errorMsg,
      });
      this.deductionFormService.pushError({
        step: 'goal',
        error: errorMsg,
      });
    }
    if (this.goalTypeControl.value.name == GOAL_TYPES.REPETITIONS) {
      if (this.repetitionsControl.value == null) {
        let errorMsg = 'Debes seleccionar un número de repeticiones';
        this.repetitionsControl.markAsDirty();
        this.repetitionsControl.markAsTouched();
        this.repetitionsControl.setErrors({
          serverError: errorMsg,
        });

        this.deductionFormService.pushError({
          step: 'goal',
          error: errorMsg,
        });
      }
    } else if (this.goalTypeControl.value.name == GOAL_TYPES.CALENDAR) {
      if (this.dateControl.value == null) {
        let errorMsg = 'Debes seleccionar una fecha de finalización';
        this.dateControl.markAsDirty();
        this.dateControl.markAsTouched();
        this.dateControl.setErrors({
          serverError: errorMsg,
        });
        this.deductionFormService.pushError({
          step: 'goal',
          error: errorMsg,
        });
      }
    } else if (this.goalTypeControl.value.name == GOAL_TYPES.AMOUNT) {
      this.validateCurrencySignal.next(true);
    }

    let goal_type = '';
    if (this.goalTypeControl.value != null) {
      goal_type = this.goalTypeControl.value.value;
    }
    let repetitions = this.repetitionsControl.value;
    let date = this.dateControl.value;
    let currency = '';
    if (this.currencyControl.value != null) {
      currency = this.currencyControl.value.value;
    }
    let amount = this.amountControl.value;
    let rate = this.rateControl.value;

    if (this.deductionFormService.frequency.value.value == FREQUENCIES.ONEOFF) {
      goal_type = '';
      repetitions = null;
      date = null;
      currency = '';
      amount = null;
      rate = null;
    }

    this.deductionFormService.goalOk(
      goal_type,
      repetitions,
      date,
      currency,
      amount,
      rate
    );
  }
}
