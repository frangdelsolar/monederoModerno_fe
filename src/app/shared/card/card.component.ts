import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Image } from '@app/core/models/image.interface';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() image: Image;
  @Input() imageControl: FormControl;
  @Input() editModeOn: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
