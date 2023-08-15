import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Color';
  @Input() control: FormControl = new FormControl<Date | null>(null, []);
  @Input() id: any = 'color-picker';

  constructor() {}

  ngOnInit(): void {}
}
