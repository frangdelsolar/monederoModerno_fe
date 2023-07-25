import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() value: string;
  @Input() icon: string;
  @Input() id: string = 'input-tags';

  constructor() {}

  ngOnInit(): void {}
}
