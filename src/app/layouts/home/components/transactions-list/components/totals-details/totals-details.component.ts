import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-totals-details',
  templateUrl: './totals-details.component.html',
  styleUrls: ['./totals-details.component.scss'],
})
export class TotalsDetailsComponent implements OnInit {
  @Input() expenseData: any;
  @Input() incomeData: any;

  constructor() {}

  ngOnInit(): void {}
}
