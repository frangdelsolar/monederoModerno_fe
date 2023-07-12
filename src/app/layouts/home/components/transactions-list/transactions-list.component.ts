import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TransactionService } from '@app/core/controllers/transaction.controller';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit {
  dateControl: FormControl = new FormControl<Date>(new Date(), []);
  transactions: any[] = [];
  month: string;
  year: string;

  constructor(private transactionSvc: TransactionService) {}

  ngOnInit(): void {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    this.loadData(month, year);

    this.dateControl.valueChanges.subscribe((value) => {
      const date = new Date(value);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      this.loadData(month, year);
    });
  }

  loadData(month: number, year: number) {
    this.month = month.toString();
    this.year = year.toString();
    this.transactionSvc
      .getActiveByDate(month.toString(), year.toString())
      .subscribe(
        (res: any) => {
          this.transactions = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
