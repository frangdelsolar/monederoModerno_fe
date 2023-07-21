import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServiceService } from '@app/core/controllers/service.controller';
import TRANSACTION_TYPES from '@app/core/enums/transaction_type.enum';
import { DeductionFormService } from '@app/core/services/deduction-form.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
  @Input() editOn: boolean = true;
  @Input() label: string = '¿Qué vas a programar?';

  labelForTransactionTypeControl: string = 'Tipo de transacción';
  transactionTypeControl: FormControl = new FormControl(null, []);

  showServiceControl: boolean = false;
  labelForServiceControl: string = 'Categoría';
  serviceControl: FormControl = new FormControl(null, []);

  showServiceProviderControl: boolean = false;
  labelForServiceProviderControl: string = 'Proveedor';
  serviceProviderControl: FormControl = new FormControl(null, []);

  labelForProductControl: string = 'Detalle';
  productControl: FormControl = new FormControl(null, []);

  constructor(private deductionFormSvc: DeductionFormService) {}

  ngOnInit(): void {
    this.transactionTypeControl.valueChanges.subscribe((value) => {
      if (value.value == TRANSACTION_TYPES.INCOME) {
        this.showServiceControl = true;
        this.labelForProductControl = '¿Qué vas a recibir?';
        this.showServiceProviderControl = true;
        this.labelForServiceProviderControl = '¿Quién te paga?';
      } else if (value.value == TRANSACTION_TYPES.EXPENSE) {
        this.showServiceControl = true;
        this.labelForProductControl = '¿Qué vas a pagar?';
        this.showServiceProviderControl = true;
        this.labelForServiceProviderControl = '¿A quién le vas a pagar?';
      } else {
        this.showServiceControl = false;
        this.showServiceProviderControl = false;
      }
    });

    this.deductionFormSvc.SaveTransactionSignal.subscribe((save: boolean) => {
      if (save) {
        this.save();
      }
    });
  }

  save() {
    let transaction_type = this.transactionTypeControl.value;
    let service_product = this.productControl.value;
    if (!transaction_type) {
      let errorMsg = 'Debes seleccionar un tipo de transacción';
      this.transactionTypeControl.markAsDirty();
      this.transactionTypeControl.markAsTouched();
      this.transactionTypeControl.setErrors({ serverError: errorMsg });
      this.deductionFormSvc.pushError({
        step: 'transaction',
        error: errorMsg,
      });
      return;
    }
    transaction_type = transaction_type.value;

    this.deductionFormSvc.transactionOk(transaction_type, service_product);
  }
}
