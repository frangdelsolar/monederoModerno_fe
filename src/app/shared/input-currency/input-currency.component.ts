import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrencyService } from '@app/core/controllers/currency.controller';

@Component({
  selector: 'app-input-currency',
  templateUrl: './input-currency.component.html',
  styleUrls: ['./input-currency.component.scss'],
})
export class InputCurrencyComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Label';
  @Input() control: FormControl = new FormControl(null, []);

  currencyControl: FormControl = new FormControl(null, []);
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
  rateControl: FormControl = new FormControl(null, []);

  conversion: number = 0;

  constructor(private currencySvc: CurrencyService) {}

  ngOnInit(): void {
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

    this.control.valueChanges.subscribe((value) => {
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
    this.conversion = this.rateControl.value * this.control.value;
  }
}
