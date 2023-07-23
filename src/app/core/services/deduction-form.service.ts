import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TransactionService } from '../controllers/transaction.controller';

@Injectable({
  providedIn: 'root',
})
export class DeductionFormService {
  public SaveServiceSignal = new BehaviorSubject(false);
  public SaveServiceProviderSignal = new BehaviorSubject(false);
  public SaveTransactionSignal = new BehaviorSubject(false);
  public SaveFrequencySignal = new BehaviorSubject(false);
  public SaveStartDateSignal = new BehaviorSubject(false);
  public SaveGoalSignal = new BehaviorSubject(false);

  errors: any[] = [];
  errorsEmmiter: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  form: FormGroup;
  transaction_type: FormControl = new FormControl(null, [Validators.required]);
  service: FormControl = new FormControl(null, [Validators.required]);
  service_provider: FormControl = new FormControl(null, [Validators.required]);
  service_product: FormControl = new FormControl(null, []);
  frequency: FormControl = new FormControl(null, [Validators.required]);
  frequency_day: FormControl = new FormControl(null, []);
  frequency_month: FormControl = new FormControl(null, []);
  start_date: FormControl = new FormControl(null, []);
  goal_type: FormControl = new FormControl(null, []);
  repetitions: FormControl = new FormControl(null, []);
  end_date: FormControl = new FormControl(null, []);
  goal_currency: FormControl = new FormControl(null, []);
  goal_amount: FormControl = new FormControl(null, []);
  goal_rate: FormControl = new FormControl(null, []);
  comment: FormControl = new FormControl(null, []);
  currency: FormControl = new FormControl(null, []);
  amount: FormControl = new FormControl(null, []);
  rate: FormControl = new FormControl(null, []);
  paid: FormControl = new FormControl(null, []);
  tags: FormControl = new FormControl(null, []);

  constructor(
    private fb: FormBuilder,
    private transactionSvc: TransactionService
  ) {
    this.form = this.fb.group({
      transaction_type: this.transaction_type,
      service: this.service,
      service_provider: this.service_provider,
      service_product: this.service_product,
      frequency: this.frequency,
      frequency_day: this.frequency_day,
      frequency_month: this.frequency_month,
      start_date: this.start_date,
      goal_type: this.goal_type,
      repetitions: this.repetitions,
      end_date: this.end_date,
      goal_currency: this.goal_currency,
      goal_amount: this.goal_amount,
      goal_rate: this.goal_rate,
      comment: this.comment,
      currency: this.currency,
      amount: this.amount,
      rate: this.rate,
      paid: this.paid,
      tags: this.tags,
    });
  }

  public save() {
    this.errors = [];
    this.SaveServiceSignal.next(true);
    this.SaveServiceProviderSignal.next(true);
    this.SaveTransactionSignal.next(true);
    this.SaveFrequencySignal.next(true);
    this.SaveStartDateSignal.next(true);
    this.SaveGoalSignal.next(true);

    setTimeout(() => {
      if (!this.checkErrors()) {
        this.sendRequestToServer();
      }
    }, 1000);
  }

  private checkErrors(): boolean {
    if (this.errors.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  private sendRequestToServer() {
    this.transactionSvc.create(this.form.value).subscribe(
      (res) => {
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  pushError(error: any) {
    this.errors.push(error);
    this.errorsEmmiter.next(this.errors);
  }

  serviceOk(value: string) {
    this.service.setValue(value);
  }

  serviceProviderOk(value: string) {
    this.service_provider.setValue(value);
  }

  transactionOk(transaction: string, product: string, tags: string[]) {
    this.transaction_type.setValue(transaction);
    this.service_product.setValue(product);
    this.tags.setValue(tags);
  }

  startDateOk(value: Date) {
    this.start_date.setValue(value);
  }

  setFrequency(value: string) {
    this.frequency.setValue(value);
  }

  frequencyOk(frequency: string, day: string, month: string) {
    this.frequency.setValue(frequency);
    this.frequency_day.setValue(day);
    this.frequency_month.setValue(month);
  }

  goalOk(
    goal_type: string,
    repetitions: number | null,
    end_date: Date | null,
    goal_currency: string | null,
    goal_amount: number | null,
    goal_rate: number | null
  ) {
    this.goal_type.setValue(goal_type);
    this.repetitions.setValue(repetitions);
    this.end_date.setValue(end_date);
    this.goal_currency.setValue(goal_currency);
    this.goal_amount.setValue(goal_amount);
    this.goal_rate.setValue(goal_rate);
  }

  commentOk(value: string) {
    this.comment.setValue(value);
  }

  amountOk(currency: string, amount: number, rate: number, paid: boolean) {
    this.currency.setValue(currency);
    this.amount.setValue(amount);
    this.rate.setValue(rate);
    this.paid.setValue(paid);
  }
}
