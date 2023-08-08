import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TRANSACTION_TYPE_ITEMS } from '@app/core/enums/transaction_type.enum';

@Component({
  selector: 'app-deduction-type-dropdown',
  templateUrl: './deduction-type-dropdown.component.html',
  styleUrls: ['./deduction-type-dropdown.component.scss'],
})
export class DeductionTypeDropdownComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Tipo de Transacción';
  @Input() control: FormControl = new FormControl<Date | null>(null, []);

  items = TRANSACTION_TYPE_ITEMS;
  constructor() {}

  ngOnInit(): void {}
}
