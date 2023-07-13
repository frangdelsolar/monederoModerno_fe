import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import FREQUENCIES, {
  FREQUENCIES_DISPLAY,
} from '@app/core/enums/frequency.enum';
import GOAL_TYPES from '@app/core/enums/goal_type.enum';
import TRANSACTION_TYPES from '@app/core/enums/transaction_type.enum';
import { Transaction } from '@app/core/models/transaction.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction-section',
  templateUrl: './transaction-section.component.html',
  styleUrls: ['./transaction-section.component.scss'],
})
export class TransactionSectionComponent implements OnInit {
  @Input() transactionObservable: Observable<Transaction>;
  transaction: Transaction;

  deductionLabel = 'Deducción';
  frequencyLabel = 'Frecuencia';
  startDateLabel = 'Periodo de validez';
  commentLabel = 'Anexos';

  serviceControl: FormControl = new FormControl(null, []);
  serviceProviderControl: FormControl = new FormControl(null, []);
  frequencyControl: FormControl = new FormControl(null, []);
  frequencyDayControl: FormControl = new FormControl(null, []);
  frequencyMonthControl: FormControl = new FormControl(null, []);
  startDateControl: FormControl = new FormControl(null, []);
  goalTypeControl: FormControl = new FormControl(null, []);
  endDateControl: FormControl = new FormControl(null, []);
  repetitionsControl: FormControl = new FormControl(null, []);
  goalAmountControl: FormControl = new FormControl(null, []);
  indefiniteControl: FormControl = new FormControl(null, []);

  commentControl: FormControl = new FormControl(null, []);

  showFrequencyDay = false;
  showFrequencyMonth = false;
  showEndDate = false;
  showRepetitions = false;
  showGoalAmount = false;
  showIndefinite = false;
  showStartDateSection = true;
  showCommentSection = false;

  constructor() {}

  ngOnInit(): void {
    this.transactionObservable.subscribe((transaction) => {
      this.transaction = transaction;
      let in_transaction_type = transaction.transaction_type;
      let in_frequency = transaction.frequency;
      let in_goal_type = transaction.goal_type;

      if (in_transaction_type == TRANSACTION_TYPES.INCOME) {
        this.deductionLabel = 'Estás recibiendo';
        this.frequencyLabel = 'Este ingreso se produce';
      } else if (in_transaction_type == TRANSACTION_TYPES.EXPENSE) {
        this.deductionLabel = 'Estás pagando';
        this.frequencyLabel = 'Este gasto se produce';
      }

      this.serviceControl.setValue(this.transaction.service.name);
      this.serviceProviderControl.setValue(
        this.transaction.service_provider.name
      );
      this.frequencyControl.setValue(
        FREQUENCIES_DISPLAY[in_frequency as keyof typeof FREQUENCIES_DISPLAY]
      );
      if (
        in_frequency == FREQUENCIES.MONTHLY ||
        in_frequency == FREQUENCIES.YEARLY
      ) {
        this.showFrequencyDay = true;
      }
      if (in_frequency == FREQUENCIES.YEARLY) {
        this.showFrequencyMonth = true;
      }

      if (in_frequency == FREQUENCIES.ONEOFF) {
        this.showStartDateSection = false;
      }
      this.frequencyDayControl.setValue(this.transaction.frequency_day);
      this.frequencyMonthControl.setValue(this.transaction.frequency_month);

      this.startDateControl.setValue(this.transaction.start_date);

      this.goalTypeControl.setValue(in_goal_type);
      this.endDateControl.setValue(this.transaction.end_date);
      if (in_goal_type == GOAL_TYPES.CALENDAR) {
        this.showEndDate = true;
      } else if (in_goal_type == GOAL_TYPES.REPETITIONS) {
        this.showRepetitions = true;
      } else if (in_goal_type == GOAL_TYPES.AMOUNT) {
        this.showGoalAmount = true;
      } else if (in_goal_type == GOAL_TYPES.NOGOAL) {
        this.showIndefinite = true;
        this.indefiniteControl.setValue('Indefinidas');
      }
      this.repetitionsControl.setValue(this.transaction.repetitions);
      let goal_amount = '';
      if (this.transaction.goal_currency != null) {
        goal_amount = `${this.transaction.goal_currency.currency} $${this.transaction.goal_currency.amount}`;
      }
      this.goalAmountControl.setValue(goal_amount);

      this.commentControl.setValue(this.transaction.comment);
      if (this.commentControl.value != '') {
        this.showCommentSection = true;
      }
    });
  }
}
