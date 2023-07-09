import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss'],
})
export class MonthPickerComponent implements OnInit {
  @Input() label: string = 'Label';
  @Input() control: FormControl = new FormControl<Date | null>(new Date(), []);

  constructor() {}

  ngOnInit(): void {}
}
