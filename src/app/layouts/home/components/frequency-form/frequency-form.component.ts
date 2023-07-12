import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import FREQUENCIES, { FREQUENCY_ITEMS } from '@app/core/enums/frequency.enum';
import monthEnum from '@app/core/enums/months.enum';
import { DeductionFormService } from '@app/core/services/deduction-form.service';
import processFormControlErrors from '@app/core/utils/processFormControlErrors';

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
      key: 'ONEOFF',
      name: 'Transacción única',
    },
    {
      key: 'recurring',
      name: 'Transacción recurrente',
    },
  ];

  showFrequencyControl: boolean = false;

  frequencyControl: FormControl = new FormControl(null, []);
  frequencyItems = FREQUENCY_ITEMS.filter(
    (item) => item.value != FREQUENCIES.ONEOFF
  );

  showMonthControl: boolean = false;
  monthControl: FormControl = new FormControl(null, []);
  monthItems = monthEnum;

  showDayControl: boolean = false;
  dayControl: FormControl = new FormControl(null, []);
  dayItems: any[] = [];

  processError = processFormControlErrors;

  constructor(private deductionFormSvc: DeductionFormService) {
    for (let i = 1; i <= 28; i++) {
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
      if (value && value.value === FREQUENCIES.MONTHLY) {
        this.showMonthControl = false;
        this.showDayControl = true;
      } else if (value && value.value === FREQUENCIES.YEARLY) {
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
      if (value.key === FREQUENCIES.ONEOFF) {
        this.showFrequencyControl = false;
        this.showDayControl = false;
        this.showMonthControl = false;
        this.frequencyControl.setValue(null);
        this.dayControl.setValue(null);
        this.monthControl.setValue(null);
      } else {
        this.showFrequencyControl = true;
      }
      this.deductionFormSvc.setFrequency(FREQUENCIES.ONEOFF);
    });
  }

  validateAndSave() {
    if (this.eventTypeControl.value === null) {
      this.processError(
        'frequency',
        this.eventTypeControl,
        'Debes seleccionar un frecuencia de transacción',
        this.deductionFormSvc
      );
    }
    let frequency_value: string = FREQUENCIES.ONEOFF;
    let month_value = '';
    let day_value = '';
    if (this.eventTypeControl.value.key == 'recurring') {
      if (this.frequencyControl.value === null) {
        this.processError(
          'frequency',
          this.frequencyControl,
          'Debes seleccionar un frecuencia',
          this.deductionFormSvc
        );
        frequency_value = '';
      } else {
        frequency_value = this.frequencyControl.value.value;
      }

      if (this.frequencyControl.value.value === FREQUENCIES.YEARLY) {
        if (this.monthControl.value === null) {
          this.processError(
            'frequency',
            this.monthControl,
            'Debes seleccionar un mes',
            this.deductionFormSvc
          );
        } else {
          month_value = this.monthControl.value.value;
        }
      }

      if (
        this.frequencyControl.value.value == FREQUENCIES.MONTHLY ||
        this.frequencyControl.value.value == FREQUENCIES.YEARLY
      ) {
        if (this.dayControl.value === null) {
          this.processError(
            'frequency',
            this.dayControl,
            'Debes seleccionar un día',
            this.deductionFormSvc
          );
        } else {
          day_value = this.dayControl.value.value;
        }
      }
    }
    this.deductionFormSvc.frequencyOk(frequency_value, day_value, month_value);
  }
}
