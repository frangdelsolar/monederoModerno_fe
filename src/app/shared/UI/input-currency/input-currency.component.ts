import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrencyService } from '@app/core/controllers/currency.controller';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-input-currency',
  templateUrl: './input-currency.component.html',
  styleUrls: ['./input-currency.component.scss'],
})
export class InputCurrencyComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Label';
  @Input() showRateControl: boolean = true;
  @Input() currencyControl: FormControl = new FormControl(null, []);
  @Input() amountControl: FormControl = new FormControl(null, []);
  @Input() rateControl: FormControl = new FormControl(null, []);
  @Input() rateDateControl: FormControl = new FormControl(new Date(), []);
  @Input() validateSignal: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  @Output() errorsEmitter: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  conversion: number = 0;
  conversionCurrency: string = 'USD';
  showRate: boolean = true;
  rateDate: Date = new Date();
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

  constructor(private currencySvc: CurrencyService) {}

  ngOnInit(): void {
    this.validateSignal.subscribe((validate: boolean) => {
      if (validate) {
        this.validate();
      }
    });

    this.getExchangeRate();
    this.rateDateControl.valueChanges.subscribe((value) => {
      this.rateDate = value;
      this.getExchangeRate();
    });

    this.currencyControl.valueChanges.subscribe((value) => {
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

  getExchangeRate() {
    this.loading.next(true);
    this.currencySvc
      .get(this.rateDateControl.value.toISOString().split('T')[0])
      .subscribe((rate: any) => {
        this.rateControl.setValue(rate['blue']['venta']);
        this.getConversion();
        this.loading.next(false);
      });
  }

  getConversion() {
    if (!(this.amountControl.value && this.rateControl.value)) {
      return;
    }
    if (this.currencyControl.value.value == 'USD') {
      this.conversion =
        this.rateControl.value * parseFloat(this.amountControl.value);
      this.conversionCurrency = 'ARS';
    } else {
      this.conversion =
        parseFloat(this.amountControl.value) / this.rateControl.value;
      this.conversionCurrency = 'USD';
    }
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
