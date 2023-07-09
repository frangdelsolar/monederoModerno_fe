import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import frequencyEnum from '@app/core/enums/frequency.enum';
import monthEnum from '@app/core/enums/months.enum';
import { DeductionFormService } from '@app/core/services/deduction-form.service';

@Component({
  selector: 'app-frequency-form',
  templateUrl: './frequency-form.component.html',
  styleUrls: ['./frequency-form.component.scss'],
})
export class FrequencyFormComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Label';

  eventTypeControl: FormControl = new FormControl(null, []);
  eventType = [
    {
      key: 'one-off',
      name: 'Transacción única',
    },
    {
      key: 'recurring',
      name: 'Transacción recurrente',
    },
  ];

  showFrequencyControl: boolean = false;

  frequencyControl: FormControl = new FormControl(null, []);
  frequencyItems = frequencyEnum.filter((item) => item.value !== 'one-off');

  showMonthControl: boolean = false;
  monthControl: FormControl = new FormControl(null, []);
  monthItems = monthEnum;

  showDayControl: boolean = false;
  dayControl: FormControl = new FormControl(null, []);
  dayItems: any[] = [];
  constructor(private deductionFormSvc: DeductionFormService) {
    for (let i = 1; i <= 31; i++) {
      this.dayItems.push({
        value: i.toString(),
        name: i.toString(),
      });
    }
  }

  ngOnInit(): void {
    this.deductionFormSvc.SaveFrequencySignal.subscribe((value) => {
      if (value) {
        this.validateAndSave();
      }
    });

    this.frequencyControl.valueChanges.subscribe((value) => {
      if (value && value.value === 'monthly') {
        this.showMonthControl = false;
        this.showDayControl = true;
      } else if (value && value.value === 'yearly') {
        this.showMonthControl = true;
        this.showDayControl = true;
      } else {
        this.showMonthControl = false;
        this.showDayControl = false;
      }
    });

    this.monthControl.valueChanges.subscribe((value) => {
      if (value) {
        this.dayItems = [];
        const month = parseInt(value.value);
        const year = new Date().getFullYear();
        const days = new Date(year, month, 0).getDate();
        for (let i = 1; i <= days; i++) {
          this.dayItems.push({
            value: i.toString(),
            name: i.toString(),
          });
        }
      }
    });

    this.eventTypeControl.valueChanges.subscribe((value) => {
      if (value.key === 'one-off') {
        this.showFrequencyControl = false;
        this.showDayControl = false;
        this.showMonthControl = false;
        this.frequencyControl.setValue(null);
        this.dayControl.setValue(null);
        this.monthControl.setValue(null);
      } else {
        this.showFrequencyControl = true;
      }
      this.deductionFormSvc.setFrequency(value.key);
    });
  }

  validateAndSave() {
    if (this.eventTypeControl.value === null) {
      let errorMsg = 'Debes seleccionar un frecuencia de transacción';
      this.deductionFormSvc.pushError({
        step: 'frequency',
        error: errorMsg,
      });
      this.eventTypeControl.markAsDirty();
      this.eventTypeControl.markAsTouched();
      this.eventTypeControl.setErrors({ serverError: errorMsg });
    }
    let frequency_value = 'one-off';
    let month_value = '';
    let day_value = '';
    if (this.eventTypeControl.value.key == 'recurring') {
      if (this.frequencyControl.value === null) {
        let errorMsg = 'Debes seleccionar una frecuencia';
        this.deductionFormSvc.pushError({
          step: 'frequency',
          error: errorMsg,
        });
        this.frequencyControl.markAsDirty();
        this.frequencyControl.markAsTouched();
        this.frequencyControl.setErrors({ serverError: errorMsg });
        frequency_value = '';
      } else {
        frequency_value = this.frequencyControl.value.value;
      }

      if (this.frequencyControl.value.value === 'yearly') {
        if (this.monthControl.value === null) {
          let errorMsg = 'Debes seleccionar un mes';
          this.deductionFormSvc.pushError({
            step: 'frequency',
            error: errorMsg,
          });
          this.monthControl.markAsDirty();
          this.monthControl.markAsTouched();
          this.monthControl.setErrors({ serverError: errorMsg });
        } else {
          month_value = this.monthControl.value.value;
        }
      }

      if (['yearly', 'monthly'].includes(this.frequencyControl.value.value)) {
        if (this.dayControl.value === null) {
          let errorMsg = 'Debes seleccionar un día';
          this.deductionFormSvc.pushError({
            step: 'frequency',
            error: errorMsg,
          });
          this.dayControl.markAsDirty();
          this.dayControl.markAsTouched();
          this.dayControl.setErrors({ serverError: errorMsg });
        } else {
          day_value = this.dayControl.value.value;
        }
      }
    }
    this.deductionFormSvc.frequencyOk(frequency_value, day_value, month_value);
  }
}
