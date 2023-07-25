import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss'],
})
export class InputSwitchComponent implements OnInit {
  @Input() id: string = 'switch';
  @Input() label: string = 'Label';
  @Input() control: FormControl = new FormControl(null, []);

  constructor() {}

  ngOnInit(): void {}
}
