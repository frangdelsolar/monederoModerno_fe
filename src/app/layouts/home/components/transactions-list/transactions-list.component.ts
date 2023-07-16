import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TransactionService } from '@app/core/controllers/transaction.controller';
import { Currency } from '@app/core/models/currency.interface';
import { BehaviorSubject } from 'rxjs';

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
  expenseData: any;
  incomeData: any;
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
    this.loading.next(true);
    this.month = month.toString();
    this.year = year.toString();
    this.transactionSvc
      .getActiveByDate(month.toString(), year.toString())
      .subscribe(
        (res: any) => {
          this.transactions = res.transactions;
          this.expenseData = res.expenses;
          this.incomeData = res.incomeData;
          this.loading.next(false);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
