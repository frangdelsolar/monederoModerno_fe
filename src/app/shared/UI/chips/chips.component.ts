import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent implements OnInit {
  @Input() label: string = 'Label';
  @Input() control: FormControl = new FormControl('', []);
  separatorExp: string = ',';

  constructor() {}

  ngOnInit(): void {}
}
