import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BudgetGoalService } from '@app/core/controllers/budget-goal-controller.service';
import processFormControlErrors from '@app/core/utils/processFormControlErrors';

@Component({
  selector: 'app-budget-goal-form',
  templateUrl: './budget-goal-form.component.html',
  styleUrls: ['./budget-goal-form.component.scss'],
})
export class BudgetGoalFormComponent implements OnInit {
  processError = processFormControlErrors;

  editModeOn = true;
  bankAccount: any;

  label = 'Detalle';
  labelForNameControl = 'Nombre';
  labelForDescriptionControl = 'Descripción';
  labelForCurrencyControl = 'Objetivo';

  labelForTransactionTypeControl: string = 'Tipo de transacción';
  transactionTypeControl: FormControl = new FormControl(null, []);

  showServiceControl: boolean = false;
  labelForServiceControl: string = 'Categoría';
  serviceControl: FormControl = new FormControl(null, []);

  form: FormGroup;
  nameControl: FormControl = new FormControl(null, [Validators.required]);
  descriptionControl: FormControl = new FormControl(null, [
    Validators.required,
  ]);
  currencyControl: FormControl = new FormControl(null, [Validators.required]);
  amountControl: FormControl = new FormControl(null, [Validators.required]);

  saveBtnLabel = 'Guardar';
  saveBtnAction = () => {};

  constructor(
    private fb: FormBuilder,
    private budgetGoalService: BudgetGoalService
  ) {
    this.form = this.fb.group({
      name: this.nameControl,
      description: this.descriptionControl,
      currency: this.currencyControl,
      amount: this.amountControl,
    });
  }

  ngOnInit(): void {
    this.saveBtnAction = this.onSave;
  }

  onSave() {}
}
