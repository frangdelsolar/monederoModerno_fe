import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TransactionService } from '@app/core/controllers/transaction.controller';
import FREQUENCIES from '@app/core/enums/frequency.enum';
import { GOAL_TYPES } from '@app/core/enums/goal_type.enum';
import { TRANSACTION_TYPES } from '@app/core/enums/transaction_type.enum';
import { Transaction } from '@app/core/models/transaction.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent implements OnInit {
  @Input() transactionId: number;
  transaction: Transaction;

  deductionLabel = 'Deducción';
  frequencyLabel = 'Frecuencia';
  startDateLabel = 'Periodo de validez';
  amountLabel = 'Valor de la cuota';
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
  amountControl: FormControl = new FormControl(null, []);
  commentControl: FormControl = new FormControl(null, []);

  showFrequencyDay = false;
  showFrequencyMonth = false;
  showEndDate = false;
  showRepetitions = false;
  showGoalAmount = false;
  showIndefinite = false;
  showCommentSection = false;

  constructor(
    private dialogSvc: AppDialogService,
    private transactionSvc: TransactionService
  ) {}

  ngOnInit(): void {
    console.log('Income', TRANSACTION_TYPES['INCOME']);

    this.dialogSvc.DialogDataObservable.subscribe((data) => {
      if (data) {
        this.transactionId = data.data.transactionId;
        this.transactionSvc
          .getById(this.transactionId.toString())
          .subscribe((transaction: Transaction) => {
            this.transaction = transaction;
            let in_transaction_type =
              TRANSACTION_TYPES[
                transaction.transaction_type as keyof typeof TRANSACTION_TYPES
              ];

            let in_frequency =
              FREQUENCIES[transaction.frequency as keyof typeof FREQUENCIES];

            let in_goal_type =
              GOAL_TYPES[transaction.goal_type as keyof typeof GOAL_TYPES];

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
            this.frequencyControl.setValue(in_frequency);
            if (
              in_frequency == FREQUENCIES.MONTHLY ||
              in_frequency == FREQUENCIES.YEARLY
            ) {
              this.showFrequencyDay = true;
            }
            if (in_frequency == FREQUENCIES.YEARLY) {
              this.showFrequencyMonth = true;
            }
            this.frequencyDayControl.setValue(this.transaction.frequency_day);
            this.frequencyMonthControl.setValue(
              this.transaction.frequency_month
            );

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

            let amount = `${
              this.transaction.currency.currency
            } $${this.transaction.currency.amount.toLocaleString()}`;
            this.amountControl.setValue(amount);

            this.commentControl.setValue(this.transaction.comment);
            if (this.commentControl.value != '') {
              this.showCommentSection = true;
            }
          });
      }
    });
  }
}
