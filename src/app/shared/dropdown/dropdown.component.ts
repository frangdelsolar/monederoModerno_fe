import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() items: any[];
  @Input() label: string = 'Label';
  @Input() control: FormControl = new FormControl('', []);
  @Input() disabled: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
