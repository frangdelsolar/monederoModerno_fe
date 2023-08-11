import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MonthSelectorService } from '@app/core/services/month-selector.service';

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss'],
})
export class MonthSelectorComponent implements OnInit {
  dateControl: FormControl = new FormControl<Date>(new Date(), []);

  constructor(private monthSelectorSvc: MonthSelectorService) {}

  ngOnInit(): void {
    this.dateControl.valueChanges.subscribe((value) => {
      this.monthSelectorSvc.dateControl.setValue(value);
    });
  }
}
