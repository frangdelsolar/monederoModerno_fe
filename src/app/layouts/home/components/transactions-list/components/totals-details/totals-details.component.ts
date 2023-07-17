import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-totals-details',
  templateUrl: './totals-details.component.html',
  styleUrls: ['./totals-details.component.scss'],
})
export class TotalsDetailsComponent implements OnInit {
  @Input() expenseData: any;
  @Input() incomeData: any;

  percentage: any;

  constructor() {}

  ngOnInit(): void {
    this.expenseData.subscribe((res: any) => {
      this.percentage = res.percentage;
      console.log(res);
    });
  }
}
