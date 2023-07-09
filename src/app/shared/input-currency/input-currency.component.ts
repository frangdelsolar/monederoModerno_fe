import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrencyService } from '@app/core/controllers/currency.controller';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-input-currency',
  templateUrl: './input-currency.component.html',
  styleUrls: ['./input-currency.component.scss'],
})
export class InputCurrencyComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Label';
  @Input() amountControl: FormControl = new FormControl(null, []);

  @Input() currencyControl: FormControl = new FormControl(null, []);
  currencyItems = [
    {
      value: 'USD',
      name: 'USD',
    },
    {
      value: 'ARS',
      name: 'ARS',
    },
  ];

  showRate: boolean = false;
  @Input() rateControl: FormControl = new FormControl(null, []);

  conversion: number = 0;

  @Input() validateSignal: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  @Output() errorsEmitter: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(private currencySvc: CurrencyService) {}

  ngOnInit(): void {
    this.validateSignal.subscribe((validate: boolean) => {
      if (validate) {
        this.validate();
      }
    });

    this.currencySvc.get().subscribe((rate: any) => {
      this.rateControl.setValue(rate['venta']);
    });

    this.currencyControl.valueChanges.subscribe((value) => {
      if (value.value == 'USD') {
        this.showRate = true;
      } else {
        this.showRate = false;
      }
      this.getConversion();
    });

    this.amountControl.valueChanges.subscribe((value) => {
      if (this.showRate) {
        this.getConversion();
      }
    });

    this.rateControl.valueChanges.subscribe((value) => {
      if (this.showRate) {
        this.getConversion();
      }
    });
  }

  getConversion() {
    this.conversion = this.rateControl.value * this.amountControl.value;
  }

  validate() {
    let errors = [];
    if (this.amountControl.value == null || this.amountControl.value == 0) {
      let errorMsg = 'Debes seleccionar un monto';
      this.amountControl.markAsDirty();
      this.amountControl.markAsTouched();
      this.amountControl.setErrors({
        serverError: errorMsg,
      });
      errors.push({
        step: 'goal',
        error: errorMsg,
      });
    }
    if (
      this.currencyControl.value == null ||
      this.currencyControl.value == ''
    ) {
      let errorMsg = 'Debes seleccionar una moneda';
      this.currencyControl.markAsDirty();
      this.currencyControl.markAsTouched();
      this.currencyControl.setErrors({
        serverError: errorMsg,
      });
      errors.push({
        step: 'goal',
        error: errorMsg,
      });
    }
    if (this.rateControl.value == 0 || this.rateControl.value == null) {
      let errorMsg = 'Debes seleccionar una tasa';
      this.rateControl.markAsDirty();
      this.rateControl.markAsTouched();
      this.rateControl.setErrors({
        serverError: errorMsg,
      });
      errors.push({
        step: 'goal',
        error: errorMsg,
      });
    }
    if (errors.length > 0) {
      this.errorsEmitter.next(errors);
    }
  }
}
