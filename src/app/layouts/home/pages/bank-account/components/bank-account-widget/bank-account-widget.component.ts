import { Component, OnInit } from '@angular/core';
import { BankAccountService } from '@app/core/controllers/bank-account-controller.service';
import { BankAccount } from '@app/core/models/bank-account.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-bank-account-widget',
  templateUrl: './bank-account-widget.component.html',
  styleUrls: ['./bank-account-widget.component.scss'],
})
export class BankAccountWidgetComponent implements OnInit {
  items: BankAccount[];

  chartCtx: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(
    private bankSvc: BankAccountService,
    private dialogSvc: AppDialogService
  ) {}

  ngOnInit(): void {
    this.bankSvc.getAll().subscribe((res) => {
      this.items = res.accounts;
      let chartData = res.historic;
      let data = {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Balance',
            data: chartData.data,
            fill: true,
            backgroundColor: 'rgba(100, 180, 255, 0.1)',
            borderColor: 'rgba(100, 180, 255, 1)',
            tension: 0,
          },
        ],
      };
      chartData = {
        type: 'line',
        data: data,
        options: {
          pointRadius: 0,
        },
      };
      this.chartCtx.next(chartData);
    });
  }
}
