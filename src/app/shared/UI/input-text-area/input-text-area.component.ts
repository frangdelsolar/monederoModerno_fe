import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text-area',
  templateUrl: './input-text-area.component.html',
  styleUrls: ['./input-text-area.component.scss'],
})
export class InputTextAreaComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Text';
  @Input() type: string = 'text';
  @Input() control: FormControl = new FormControl('', []);
  @Input() id: any = 'input-text-area';

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
