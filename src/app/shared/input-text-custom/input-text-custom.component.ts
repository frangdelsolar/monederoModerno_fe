import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text-custom',
  templateUrl: './input-text-custom.component.html',
  styleUrls: ['./input-text-custom.component.scss'],
})
export class InputTextCustomComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Text';
  @Input() type: string = 'text';
  @Input() control: FormControl = new FormControl('', []);

  value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.value = this.control.value;
  }

  onChange(value: string) {
    this.control.setValue(value);
    this.valueChange.emit(this.control.value);
  }
}
