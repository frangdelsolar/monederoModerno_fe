import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DeductionFormService } from '@app/core/services/deduction-form.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-deduction-form',
  templateUrl: './deduction-form.component.html',
  styleUrls: ['./deduction-form.component.scss'],
})
export class DeductionFormComponent implements OnInit {
  @Input() editModeOn: boolean = true;

  startDateControl: FormControl = new FormControl(null, [Validators.required]);
  amountControl: FormControl = new FormControl(null, [Validators.required]);
  currencyControl: FormControl = new FormControl(null, [Validators.required]);
  rateControl: FormControl = new FormControl(null, [Validators.required]);
  commentControl: FormControl = new FormControl('', [Validators.required]);
  frequencyControl: FormControl = new FormControl('', [Validators.required]);

  showGoalForm: boolean = false;

  validateCurrencySignal: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private deductionFormSvc: DeductionFormService) {}

  ngOnInit(): void {
    this.deductionFormSvc.frequency.valueChanges.subscribe(
      (frequency: string) => {
        if (frequency == 'one-off') {
          this.showGoalForm = false;
        } else {
          this.showGoalForm = true;
        }
      }
    );
    this.deductionFormSvc.SaveStartDateSignal.subscribe((save: boolean) => {
      if (save) {
        this.validateAndSave();
      }
    });
  }

  onCurrencyErrors(errors: any) {
    errors.forEach((error: any) => {
      this.deductionFormSvc.pushError({
        step: error.step,
        error: error.error,
      });
    });
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
      this.rateControl.value,
      this.currencyControl.value.value,
      this.amountControl.value
    );
  }

  onSaveClick() {
    this.deductionFormSvc.save();
  }
}
