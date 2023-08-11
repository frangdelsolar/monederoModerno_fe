import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class MonthSelectorService {
  dateControl: FormControl = new FormControl<Date>(new Date(), []);

  constructor() {}
}
