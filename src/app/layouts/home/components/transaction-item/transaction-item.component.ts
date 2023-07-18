import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '@app/core/models/transaction.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { DeviceService } from '@app/core/services/device.service';
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

  constructor(
    private dialogSvc: AppDialogService,
    private router: Router,
    private deviceSvc: DeviceService
  ) {}

  ngOnInit(): void {}

  showDetail() {
    this.deviceSvc.getDeviceInfo().then((res) => {
      if (res.operatingSystem == 'android' || res.operatingSystem == 'ios') {
        this.navigate();
      } else {
        this.showModal();
      }
    });
  }

  showModal() {
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
        position: 'center',
        dismissableMask: true,
      },
    });
  }
  navigate() {
    this.router.navigate(['transaccion', this.transaction.id], {
      queryParams: { month: this.month, year: this.year },
    });
  }
}
