import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Label';
  @Input() control: FormControl = new FormControl<Date | null>(null, []);
  @Input() dateFormat: string = 'dd/mm/yy';
  @Input() view: any = 'date';
  constructor() {}

  ngOnInit(): void {}
}
