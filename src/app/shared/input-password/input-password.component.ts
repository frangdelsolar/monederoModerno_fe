import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
})
export class InputPasswordComponent implements OnInit {
  @Input() label: string = 'Password';
  @Input() control: FormControl = new FormControl('', []);

  constructor() {}

  ngOnInit(): void {}
}
