import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() itemControl: FormControl = new FormControl(null, []);

  constructor() {}

  ngOnInit(): void {}
}
