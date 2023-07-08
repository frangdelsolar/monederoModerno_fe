import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-deduction-type-dropdown',
  templateUrl: './deduction-type-dropdown.component.html',
  styleUrls: ['./deduction-type-dropdown.component.scss'],
})
export class DeductionTypeDropdownComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Label';
  @Input() control: FormControl = new FormControl<Date | null>(null, []);

  items = [
    {
      value: 'expense',
      name: 'Gasto',
    },
    {
      value: 'income',
      name: 'Ingreso',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
