import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
      key: 'repetitions',
      name: 'Termina cuando se alcanza un número de repeticiones',
    },
    {
      key: 'calendar',
      name: 'Termina cuando se alcanza una fecha',
    },
    {
      key: 'amount',
      name: 'Termina cuando se alcanza un monto',
    },
    {
      key: 'no-goal',
      name: 'No se termina',
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
      if (value.key == 'repetitions') {
        this.showRepetitionsControl = true;
        this.showDateControl = false;
        this.showAmountControl = false;
        this.dateControl.setValue(null);
        this.amountControl.setValue(null);
        this.currencyControl.setValue(null);
        this.rateControl.setValue(null);
      } else if (value.key == 'calendar') {
        this.showRepetitionsControl = false;
        this.showDateControl = true;
        this.showAmountControl = false;
        this.repetitionsControl.setValue(null);
        this.amountControl.setValue(null);
        this.currencyControl.setValue(null);
        this.rateControl.setValue(null);
      } else if (value.key == 'amount') {
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
    if (this.goalTypeControl.value.key == 'repetitions') {
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
    } else if (this.goalTypeControl.value.key == 'calendar') {
      if (this.dateControl.value == null) {
        let errorMsg = 'Debes seleccionar una fecha';
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
    } else if (this.goalTypeControl.value.key == 'amount') {
      this.validateCurrencySignal.next(true);
    }

    this.deductionFormService.goalOk(
      this.goalTypeControl.value.key,
      this.repetitionsControl.value,
      this.dateControl.value,
      this.currencyControl.value.value,
      this.amountControl.value,
      this.rateControl.value
    );
  }
}
