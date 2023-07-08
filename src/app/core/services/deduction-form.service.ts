import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DeductionFormService {
  public SaveServiceSignal = new BehaviorSubject(false);
  public SaveServiceProviderSignal = new BehaviorSubject(false);
  public SaveTransactionSignal = new BehaviorSubject(false);
  public SaveFrequencySignal = new BehaviorSubject(false);

  errors: any[] = [];

  form: FormGroup;
  transaction_type: FormControl = new FormControl(null, [Validators.required]);
  service: FormControl = new FormControl(null, [Validators.required]);
  service_provider: FormControl = new FormControl(null, [Validators.required]);
  frequency: FormControl = new FormControl(null, [Validators.required]);
  frequency_day: FormControl = new FormControl(null, []);
  frequency_month: FormControl = new FormControl(null, []);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      transaction_type: this.transaction_type,
      service: this.service,
      service_provider: this.service_provider,
      frequency: this.frequency,
      frequency_day: this.frequency_day,
      frequency_month: this.frequency_month,
    });
  }

  public save() {
    console.log('saving deduction');
    this.SaveServiceSignal.next(true);
    this.SaveServiceProviderSignal.next(true);
    this.SaveTransactionSignal.next(true);
    this.SaveFrequencySignal.next(true);
  }

  pushError(error: any) {
    this.errors.push(error);
  }

  serviceOk(value: string) {
    this.service.setValue(value);
  }

  serviceProviderOk(value: string) {
    this.service_provider.setValue(value);
  }

  transactionOk(value: string) {
    this.transaction_type.setValue(value);
  }

  frequencyOk(frequency: string, day: string, month: string) {
    this.frequency.setValue(frequency);
    this.frequency_day.setValue(day);
    this.frequency_month.setValue(month);
    console.log(this.form.value);
  }
}
