import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Text';
  @Input() type: string = 'text';
  @Input() control: FormControl = new FormControl(null, []);
  @Input() iconOn: boolean = false;
  @Input() helpText: string = '';

  constructor() {}

  ngOnInit(): void {}
}
