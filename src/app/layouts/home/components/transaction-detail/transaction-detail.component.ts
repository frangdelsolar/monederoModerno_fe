import { Component, Input, OnInit } from '@angular/core';
import { AppDialogService } from '@app/core/services/app-dialog.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent implements OnInit {
  @Input() transactionId: number;

  constructor(private dialogSvc: AppDialogService) {}

  ngOnInit(): void {
    this.dialogSvc.DialogDataObservable.subscribe((data) => {
      if (data) {
        this.transactionId = data.data.transactionId;
      }
    });
  }
}
