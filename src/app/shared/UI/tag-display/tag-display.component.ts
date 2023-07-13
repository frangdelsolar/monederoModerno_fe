import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tag-display',
  templateUrl: './tag-display.component.html',
  styleUrls: ['./tag-display.component.scss'],
})
export class TagDisplayComponent implements OnInit {
  @Input() editOn: boolean = true;
  @Input() label: string = 'Tags';
  @Input() control: FormControl = new FormControl('', []);

  constructor() {}

  ngOnInit(): void {}
}
