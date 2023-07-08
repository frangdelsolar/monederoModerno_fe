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
  public SaveServiceSignal: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  public SaveServiceProviderSignal: BehaviorSubject<boolean> =
    new BehaviorSubject(false);

  public SaveTransactionSignal: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  errors: any[] = [];

  form: FormGroup;
  transaction_type: FormControl = new FormControl(null, [Validators.required]);
  service: FormControl = new FormControl(null, [Validators.required]);
  service_provider: FormControl = new FormControl(null, [Validators.required]);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      transaction_type: this.transaction_type,
      service: this.service,
      service_provider: this.service_provider,
    });
  }

  public save() {
    console.log('saving deduction');
    this.SaveServiceSignal.next(true);
    this.SaveServiceProviderSignal.next(true);
    this.SaveTransactionSignal.next(true);
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
}
