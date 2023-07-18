import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-wrapper',
  templateUrl: './transaction-wrapper.component.html',
  styleUrls: ['./transaction-wrapper.component.scss'],
})
export class TransactionWrapperComponent implements OnInit {
  transactionId: number;
  month: any;
  year: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((paramsRes: any) => {
      this.transactionId = paramsRes.id;
      this.route.queryParams.subscribe((queryRes: any) => {
        this.month = queryRes.month;
        this.year = queryRes.year;
      });
    });
  }
}
