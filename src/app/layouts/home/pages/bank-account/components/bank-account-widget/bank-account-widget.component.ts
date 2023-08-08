import { Component, OnInit } from '@angular/core';
import { BankAccountService } from '@app/core/controllers/bank-account-controller.service';
import { BankAccount } from '@app/core/models/bank-account.interface';
import { AppDialogService } from '@app/core/services/app-dialog.service';

@Component({
  selector: 'app-bank-account-widget',
  templateUrl: './bank-account-widget.component.html',
  styleUrls: ['./bank-account-widget.component.scss'],
})
export class BankAccountWidgetComponent implements OnInit {
  items: BankAccount[];

  constructor(
    private bankSvc: BankAccountService,
    private dialogSvc: AppDialogService
  ) {}

  ngOnInit(): void {
    this.bankSvc.getAll().subscribe((res) => {
      this.items = res.accounts;
    });
  }
}
