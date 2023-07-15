import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import FREQUENCIES from '@app/core/enums/frequency.enum';
import { DeductionFormService } from '@app/core/services/deduction-form.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-deduction-form',
  templateUrl: './deduction-form.component.html',
  styleUrls: ['./deduction-form.component.scss'],
})
export class DeductionFormComponent implements OnInit {
  @Input() editModeOn: boolean = true;

  errors: any[] = [];

  startDateControl: FormControl = new FormControl(new Date(), [
    Validators.required,
  ]);
  amountControl: FormControl = new FormControl(null, [Validators.required]);
  currencyControl: FormControl = new FormControl(null, [Validators.required]);
  rateControl: FormControl = new FormControl(null, [Validators.required]);
  commentControl: FormControl = new FormControl('', [Validators.required]);
  frequencyControl: FormControl = new FormControl('', [Validators.required]);

  showGoalForm: boolean = false;

  showMarkAsPaidSwitch: boolean = false;
  markAsPaidControl: FormControl = new FormControl('', [Validators.required]);

  validateCurrencySignal: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private deductionFormSvc: DeductionFormService) {}

  ngOnInit(): void {
    this.deductionFormSvc.frequency.valueChanges.subscribe((frequency) => {
      if (frequency == FREQUENCIES.ONEOFF) {
        this.showGoalForm = false;
        this.showMarkAsPaidSwitch = true;
      } else {
        this.showGoalForm = true;
        this.showMarkAsPaidSwitch = false;
      }
    });
    this.deductionFormSvc.SaveStartDateSignal.subscribe((save: boolean) => {
      if (save) {
        this.validateAndSave();
      }
    });

    this.deductionFormSvc.errorsEmmiter.subscribe((errors: any) => {
      this.errors = errors;
    });
  }

  onCurrencyErrors(errors: any) {
    if (errors && errors.length > 0) {
      errors.forEach((error: any) => {
        this.deductionFormSvc.pushError({
          step: error.step,
          error: error.error,
        });
      });
    }
  }

  validateAndSave() {
    if (this.startDateControl.value == null) {
      let errorMsg = 'Debes seleccionar una fecha de inicio';
      this.startDateControl.markAsDirty();
      this.startDateControl.markAsTouched();
      this.startDateControl.setErrors({
        serverError: errorMsg,
      });
      this.deductionFormSvc.pushError({
        step: 'service',
        error: errorMsg,
      });
    }
    this.validateCurrencySignal.next(true);
    this.deductionFormSvc.startDateOk(this.startDateControl.value);
    this.deductionFormSvc.commentOk(this.commentControl.value);
    this.deductionFormSvc.amountOk(
      this.currencyControl.value.value,
      this.amountControl.value,
      this.rateControl.value,
      this.markAsPaidControl.value
    );
  }

  onSaveClick() {
    this.deductionFormSvc.save();
  }
}
