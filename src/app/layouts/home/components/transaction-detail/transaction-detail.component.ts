import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TransactionService } from '@app/core/controllers/transaction.controller';
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
    this.dialogSvc.DialogDataObservable.subscribe((data) => {
      if (data) {
        this.transactionId = data.data.transactionId;
        this.transactionSvc
          .getById(this.transactionId.toString())
          .subscribe((transaction: Transaction) => {
            this.transaction = transaction;

            if (this.transaction.transaction_type == 'income') {
              this.deductionLabel = 'Estás recibiendo';
              this.frequencyLabel = 'Este ingreso se produce';
            } else if (this.transaction.transaction_type == 'expense') {
              this.deductionLabel = 'Estás pagando';
              this.frequencyLabel = 'Este gasto se produce';
            }
            this.serviceControl.setValue(this.transaction.service.name);
            this.serviceProviderControl.setValue(
              this.transaction.service_provider.name
            );
            this.frequencyControl.setValue(this.transaction.frequency);
            if (
              this.frequencyControl.value == 'Mensual' ||
              this.frequencyControl.value == 'Anual'
            ) {
              this.showFrequencyDay = true;
            }
            if (this.frequencyControl.value == 'Anual') {
              this.showFrequencyMonth = true;
            }
            this.frequencyDayControl.setValue(this.transaction.frequency_day);
            this.frequencyMonthControl.setValue(
              this.transaction.frequency_month
            );

            this.startDateControl.setValue(this.transaction.start_date);
            this.goalTypeControl.setValue(this.transaction.goal_type);
            this.endDateControl.setValue(this.transaction.end_date);
            if (this.goalTypeControl.value == 'calendar') {
              this.showEndDate = true;
            } else if (this.goalTypeControl.value == 'repetitions') {
              this.showRepetitions = true;
            } else if (this.goalTypeControl.value == 'amount') {
              this.showGoalAmount = true;
            } else if (this.goalTypeControl.value == 'no-goal') {
              this.showIndefinite = true;
              this.indefiniteControl.setValue('Indefinidas');
            }
            this.repetitionsControl.setValue(this.transaction.repetitions);
            let goal_amount = `${
              this.transaction.goal_currency.currency
            } $${this.transaction.goal_currency.amount.toLocaleString()}`;
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
