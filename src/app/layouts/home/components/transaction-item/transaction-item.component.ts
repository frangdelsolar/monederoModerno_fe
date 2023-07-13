import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '@app/core/models/transaction.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
})
export class TransactionItemComponent implements OnInit {
  @Input() transaction: Transaction;
  @Input() month: string;
  @Input() year: string;

  constructor(private dialogSvc: AppDialogService) {}

  ngOnInit(): void {}

  showDetail() {
    this.dialogSvc.show({
      component: TransactionDetailComponent,
      data: {
        transactionId: this.transaction.id,
        month: this.month,
        year: this.year,
      },
      params: {
        header: 'Detalle de transacción',
        closable: true,
        maximizable: true,
        responsive: true,
        breakpoints: {
          '960px': '80vw',
          '640px': '100vw',
        },
      },
    });
  }
}
